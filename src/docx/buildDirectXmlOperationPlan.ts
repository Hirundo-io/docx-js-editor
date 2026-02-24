import type { Document, HeaderFooter } from '../types/document';
import { buildTargetedDocumentXmlPatch } from './directXmlPlanBuilder';
import { resolveRelativePath } from './relsParser';
import { openDocxXml } from './rawXmlEditor';
import type { RealDocChangeOperation } from './realDocumentChangeStrategy';
import { serializeHeaderFooter } from './serializer/headerFooterSerializer';
import { serializeDocument } from './serializer/documentSerializer';

export interface BuildDirectXmlOperationPlanContext {
  currentDocument: Document;
  baselineDocument: Document;
  editedParagraphIds?: string[];
}

export interface DirectXmlOperationPlanDiagnostics {
  targetedPatchUsed: boolean;
  targetedPatchChangedParagraphs: number | null;
  fallbackReason: string | null;
  operationCount: number;
  operationPaths: string[];
}

export interface BuildDirectXmlOperationPlanOptions {
  onDiagnostics?: (diagnostics: DirectXmlOperationPlanDiagnostics) => void;
}

function collectAllSectionRefs(
  document: Document,
  kind: 'header' | 'footer'
): Array<{ rId: string }> {
  const refs: Array<{ rId: string }> = [];
  const seenRels = new Set<string>();
  const append = (items: Array<{ rId: string }> | undefined) => {
    if (!items) return;
    for (const item of items) {
      if (seenRels.has(item.rId)) continue;
      seenRels.add(item.rId);
      refs.push(item);
    }
  };

  for (const section of document.package.document.sections ?? []) {
    append(
      kind === 'header' ? section.properties.headerReferences : section.properties.footerReferences
    );
  }

  const finalSectionProperties = document.package.document.finalSectionProperties;
  append(
    kind === 'header'
      ? finalSectionProperties?.headerReferences
      : finalSectionProperties?.footerReferences
  );

  return refs;
}

export async function buildDirectXmlOperationPlan(
  context: BuildDirectXmlOperationPlanContext,
  options: BuildDirectXmlOperationPlanOptions = {}
): Promise<RealDocChangeOperation[]> {
  const { currentDocument, baselineDocument, editedParagraphIds } = context;
  const operations: RealDocChangeOperation[] = [];
  const diagnostics: DirectXmlOperationPlanDiagnostics = {
    targetedPatchUsed: false,
    targetedPatchChangedParagraphs: null,
    fallbackReason: null,
    operationCount: 0,
    operationPaths: [],
  };

  const finalize = (): RealDocChangeOperation[] => {
    diagnostics.operationCount = operations.length;
    diagnostics.operationPaths = operations.map((op) => ('path' in op ? op.path : 'n/a'));
    options.onDiagnostics?.(diagnostics);
    return operations;
  };

  const currentDocumentXml = serializeDocument(currentDocument);
  const baselineDocumentXml = serializeDocument(baselineDocument);
  if (currentDocumentXml !== baselineDocumentXml) {
    let documentXmlForSave = currentDocumentXml;

    const originalBuffer = baselineDocument.originalBuffer;
    if (originalBuffer) {
      try {
        const rawEditor = await openDocxXml(originalBuffer.slice(0));
        const rawBaselineDocumentXml = await rawEditor.getXml('word/document.xml');
        const targetedPatch = buildTargetedDocumentXmlPatch({
          baselineDocument,
          currentDocument,
          baselineDocumentXml: rawBaselineDocumentXml,
          candidateParagraphIds: editedParagraphIds,
        });
        if (targetedPatch) {
          diagnostics.targetedPatchUsed = true;
          diagnostics.targetedPatchChangedParagraphs = targetedPatch.changedParagraphIds.length;
          documentXmlForSave = targetedPatch.xml;
        } else {
          diagnostics.fallbackReason = 'targeted-patch-returned-null';
        }
      } catch (error) {
        diagnostics.fallbackReason =
          error instanceof Error
            ? `targeted-patch-error:${error.message}`
            : 'targeted-patch-error:unknown';
        console.warn(
          'Failed to build targeted document.xml patch, falling back to full document.xml serialization',
          error
        );
      }
    } else {
      diagnostics.fallbackReason = 'missing-original-buffer';
    }

    operations.push({
      type: 'set-xml',
      path: 'word/document.xml',
      xml: documentXmlForSave,
    });
  }

  const relationships = currentDocument.package.relationships;
  if (!relationships) {
    return finalize();
  }

  const seenParts = new Set<string>();

  const appendHeaderFooterOps = (
    refs: { rId: string }[] | undefined,
    map: Map<string, HeaderFooter> | undefined,
    baselineMap: Map<string, HeaderFooter> | undefined
  ): void => {
    if (!refs || !map) return;

    for (const ref of refs) {
      const relationship = relationships.get(ref.rId);
      const headerFooter = map.get(ref.rId);
      if (!relationship || !headerFooter || relationship.targetMode === 'External') {
        continue;
      }

      const partPath = resolveRelativePath('word/_rels/document.xml.rels', relationship.target);
      if (seenParts.has(partPath)) {
        continue;
      }
      seenParts.add(partPath);

      const currentXml = serializeHeaderFooter(headerFooter);
      const baselineHeaderFooter = baselineMap?.get(ref.rId);
      if (baselineHeaderFooter) {
        const baselineXml = serializeHeaderFooter(baselineHeaderFooter);
        if (currentXml === baselineXml) {
          continue;
        }
      }

      operations.push({
        type: 'set-xml',
        path: partPath,
        xml: currentXml,
      });
    }
  };

  appendHeaderFooterOps(
    collectAllSectionRefs(currentDocument, 'header'),
    currentDocument.package.headers,
    baselineDocument.package.headers
  );
  appendHeaderFooterOps(
    collectAllSectionRefs(currentDocument, 'footer'),
    currentDocument.package.footers,
    baselineDocument.package.footers
  );

  return finalize();
}

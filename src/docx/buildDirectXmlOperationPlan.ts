import type { Document, HeaderFooter, Relationship } from '../types/document';
import { buildTargetedDocumentXmlPatch } from './directXmlPlanBuilder';
import { resolveRelativePath } from './relsParser';
import { openDocxXml } from './rawXmlEditor';
import type { RealDocChangeOperation } from './realDocumentChangeStrategy';
import { serializeHeaderFooter } from './serializer/headerFooterSerializer';
import { serializeEndnotes, serializeFootnotes } from './serializer/notesSerializer';
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

const DOCUMENT_RELS_PATH = 'word/_rels/document.xml.rels';
const DOCUMENT_PART_PATH = 'word/document.xml';
const REL_TYPE_FOOTNOTES =
  'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes';
const REL_TYPE_ENDNOTES =
  'http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes';

function findRelationshipByType(
  relationships: Map<string, Relationship> | undefined,
  relationshipType: string
): { rId: string; relationship: Relationship } | null {
  if (!relationships) return null;
  for (const [rId, relationship] of relationships.entries()) {
    if (relationship.type !== relationshipType) continue;
    return { rId, relationship };
  }
  return null;
}

function toPartName(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
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
  const baselineRelationships = baselineDocument.package.relationships;
  const seenParts = new Set<string>();
  const removedParts = new Set<string>();
  const removedRelationships = new Set<string>();

  const appendHeaderFooterOps = (
    currentRefs: { rId: string }[] | undefined,
    currentMap: Map<string, HeaderFooter> | undefined,
    baselineRefs: { rId: string }[] | undefined,
    baselineMap: Map<string, HeaderFooter> | undefined
  ): void => {
    const currentRefIds = new Set((currentRefs ?? []).map((ref) => ref.rId));
    const currentPartPaths = new Set<string>();

    for (const ref of currentRefs ?? []) {
      const relationship = relationships?.get(ref.rId);
      const headerFooter = currentMap?.get(ref.rId);
      if (!relationship || !headerFooter || relationship.targetMode === 'External') {
        continue;
      }

      const partPath = resolveRelativePath(DOCUMENT_RELS_PATH, relationship.target);
      currentPartPaths.add(partPath);
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

    for (const baselineRef of baselineRefs ?? []) {
      if (currentRefIds.has(baselineRef.rId)) continue;

      const baselineRelationship = baselineRelationships?.get(baselineRef.rId);
      if (!baselineRelationship || baselineRelationship.targetMode === 'External') {
        continue;
      }

      if (!removedRelationships.has(baselineRef.rId)) {
        removedRelationships.add(baselineRef.rId);
        operations.push({
          type: 'remove-relationship',
          ownerPartPath: DOCUMENT_PART_PATH,
          id: baselineRef.rId,
          allowMissing: true,
        });
      }

      const baselinePartPath = resolveRelativePath(DOCUMENT_RELS_PATH, baselineRelationship.target);
      if (currentPartPaths.has(baselinePartPath) || removedParts.has(baselinePartPath)) {
        continue;
      }
      removedParts.add(baselinePartPath);

      operations.push({
        type: 'remove-part',
        path: baselinePartPath,
      });
      operations.push({
        type: 'remove-content-type-override',
        partName: toPartName(baselinePartPath),
        allowMissing: true,
      });
    }
  };

  if (!relationships && !baselineRelationships) {
    return finalize();
  }

  appendHeaderFooterOps(
    collectAllSectionRefs(currentDocument, 'header'),
    currentDocument.package.headers,
    collectAllSectionRefs(baselineDocument, 'header'),
    baselineDocument.package.headers
  );
  appendHeaderFooterOps(
    collectAllSectionRefs(currentDocument, 'footer'),
    currentDocument.package.footers,
    collectAllSectionRefs(baselineDocument, 'footer'),
    baselineDocument.package.footers
  );

  const appendNotesOps = (
    relationshipType: string,
    currentXml: string,
    baselineXml: string
  ): void => {
    const currentRelationshipEntry = findRelationshipByType(relationships, relationshipType);
    const baselineRelationshipEntry = findRelationshipByType(
      baselineRelationships,
      relationshipType
    );

    if (!currentRelationshipEntry) {
      if (
        !baselineRelationshipEntry ||
        baselineRelationshipEntry.relationship.targetMode === 'External'
      ) {
        return;
      }

      if (!removedRelationships.has(baselineRelationshipEntry.rId)) {
        removedRelationships.add(baselineRelationshipEntry.rId);
        operations.push({
          type: 'remove-relationship',
          ownerPartPath: DOCUMENT_PART_PATH,
          id: baselineRelationshipEntry.rId,
          allowMissing: true,
        });
      }

      const baselinePartPath = resolveRelativePath(
        DOCUMENT_RELS_PATH,
        baselineRelationshipEntry.relationship.target
      );
      if (removedParts.has(baselinePartPath)) {
        return;
      }
      removedParts.add(baselinePartPath);

      operations.push({
        type: 'remove-part',
        path: baselinePartPath,
      });
      operations.push({
        type: 'remove-content-type-override',
        partName: toPartName(baselinePartPath),
        allowMissing: true,
      });
      return;
    }

    if (currentRelationshipEntry.relationship.targetMode === 'External') {
      return;
    }

    const currentPartPath = resolveRelativePath(
      DOCUMENT_RELS_PATH,
      currentRelationshipEntry.relationship.target
    );
    if (seenParts.has(currentPartPath)) {
      return;
    }

    if (baselineRelationshipEntry) {
      if (baselineRelationshipEntry.relationship.targetMode === 'External') {
        return;
      }

      const baselinePartPath = resolveRelativePath(
        DOCUMENT_RELS_PATH,
        baselineRelationshipEntry.relationship.target
      );
      if (baselinePartPath === currentPartPath && baselineXml === currentXml) {
        return;
      }
    }

    seenParts.add(currentPartPath);
    operations.push({
      type: 'set-xml',
      path: currentPartPath,
      xml: currentXml,
    });
  };

  appendNotesOps(
    REL_TYPE_FOOTNOTES,
    serializeFootnotes(currentDocument.package.footnotes ?? []),
    serializeFootnotes(baselineDocument.package.footnotes ?? [])
  );
  appendNotesOps(
    REL_TYPE_ENDNOTES,
    serializeEndnotes(currentDocument.package.endnotes ?? []),
    serializeEndnotes(baselineDocument.package.endnotes ?? [])
  );

  return finalize();
}

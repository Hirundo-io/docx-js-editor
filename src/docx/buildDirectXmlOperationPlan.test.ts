import { describe, expect, test } from 'bun:test';
import type {
  Document,
  Endnote,
  Footnote,
  HeaderFooter,
  Paragraph,
  Relationship,
  RelationshipMap,
  SectionProperties,
} from '../types/document';
import { buildDirectXmlOperationPlan } from './buildDirectXmlOperationPlan';

const REL_TYPE_HEADER =
  'http://schemas.openxmlformats.org/officeDocument/2006/relationships/header';
const REL_TYPE_FOOTNOTES =
  'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes';

function createParagraph(text: string): Paragraph {
  return {
    type: 'paragraph',
    content: [
      {
        type: 'run',
        content: [{ type: 'text', text }],
      },
    ],
  };
}

function createHeader(text: string): HeaderFooter {
  return {
    type: 'header',
    hdrFtrType: 'default',
    content: [createParagraph(text)],
  };
}

function createRelationshipMap(entries: Array<[string, Relationship]>): RelationshipMap {
  return new Map<string, Relationship>(entries);
}

function createDocument(params: {
  bodyText: string;
  finalSectionProperties?: SectionProperties;
  headers?: Map<string, HeaderFooter>;
  footnotes?: Footnote[];
  endnotes?: Endnote[];
  relationships?: RelationshipMap;
}): Document {
  return {
    package: {
      document: {
        content: [createParagraph(params.bodyText)],
        finalSectionProperties: params.finalSectionProperties,
      },
      headers: params.headers,
      footnotes: params.footnotes,
      endnotes: params.endnotes,
      relationships: params.relationships,
    },
  };
}

describe('buildDirectXmlOperationPlan', () => {
  test('emits set-xml for changed footnotes.xml', async () => {
    const relationships = createRelationshipMap([
      [
        'rIdFootnotes',
        {
          id: 'rIdFootnotes',
          type: REL_TYPE_FOOTNOTES,
          target: 'footnotes.xml',
        },
      ],
    ]);

    const baseline = createDocument({
      bodyText: 'Body',
      relationships,
      footnotes: [
        {
          type: 'footnote',
          id: 1,
          content: [createParagraph('Old note')],
        },
      ],
    });
    const current = createDocument({
      bodyText: 'Body',
      relationships,
      footnotes: [
        {
          type: 'footnote',
          id: 1,
          content: [createParagraph('New note')],
        },
      ],
    });

    const operations = await buildDirectXmlOperationPlan({
      currentDocument: current,
      baselineDocument: baseline,
    });

    const footnotesOp = operations.find(
      (operation) => operation.type === 'set-xml' && operation.path === 'word/footnotes.xml'
    );
    expect(footnotesOp).toBeDefined();
    if (!footnotesOp || footnotesOp.type !== 'set-xml') return;
    expect(footnotesOp.xml).toContain('New note');
  });

  test('emits removal operations when a header reference is deleted', async () => {
    const baselineRelationships = createRelationshipMap([
      [
        'rIdHdr1',
        {
          id: 'rIdHdr1',
          type: REL_TYPE_HEADER,
          target: 'header1.xml',
        },
      ],
    ]);

    const baseline = createDocument({
      bodyText: 'Body',
      relationships: baselineRelationships,
      headers: new Map([['rIdHdr1', createHeader('Header text')]]),
      finalSectionProperties: {
        headerReferences: [{ type: 'default', rId: 'rIdHdr1' }],
      },
    });
    const current = createDocument({
      bodyText: 'Body',
      relationships: new Map(),
      headers: new Map(),
      finalSectionProperties: {},
    });

    const operations = await buildDirectXmlOperationPlan({
      currentDocument: current,
      baselineDocument: baseline,
    });

    expect(
      operations.some(
        (operation) =>
          operation.type === 'remove-relationship' &&
          operation.ownerPartPath === 'word/document.xml' &&
          operation.id === 'rIdHdr1'
      )
    ).toBe(true);
    expect(
      operations.some(
        (operation) => operation.type === 'remove-part' && operation.path === 'word/header1.xml'
      )
    ).toBe(true);
    expect(
      operations.some(
        (operation) =>
          operation.type === 'remove-content-type-override' &&
          operation.partName === '/word/header1.xml'
      )
    ).toBe(true);
  });
});

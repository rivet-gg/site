import dynamic from 'next/dynamic';
import { InvertTheme } from '@stoplight/mosaic';

const JsonSchemaViewerNoSSR = dynamic(
  async () => import('@stoplight/json-schema-viewer').then(x => x.JsonSchemaViewer),
  { ssr: false }
);

export function DocsJsonSchemaViewer({ schema }) {
  return (
    <InvertTheme>
      <JsonSchemaViewerNoSSR
        schema={schema}
        expanded={true}
        hideTopBar={false}
        emptyText='No schema defined'
        defaultExpandedDepth={0}
      />
    </InvertTheme>
  );
}

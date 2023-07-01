import dynamic from 'next/dynamic';
import { InvertTheme } from '@stoplight/mosaic';

const JsonSchemaViewerNoSSR = dynamic(
  async () => import('@stoplight/json-schema-viewer').then(x => x.JsonSchemaViewer),
  { ssr: false }
);

export function DocsJsonSchemaViewer({ ...props }) {
  return (
    <InvertTheme>
      <JsonSchemaViewerNoSSR {...props} />
    </InvertTheme>
  );
}

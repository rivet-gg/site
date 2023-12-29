import { flattenOpenAPISpec } from './flattenSpec.mjs';
import { generateApiPages } from './generateApiPages.mjs';

let BACKEND_PATH = '../rivet';

export async function main() {
  const spec = await flattenOpenAPISpec(`${BACKEND_PATH}/gen/openapi/external/spec/openapi.yml`);

  await generateApiPages(spec);
}

main();


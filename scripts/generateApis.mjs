import fs from 'fs';
import YAML from 'yaml';
import path from 'path';

let backendPath = '../rivet';

function apiPath(product) {
  return `src/pages/docs/${product}/api`;
}

let products = {
  matchmaker: {
    importantEndpoints: [
      'POST /lobbies/find',
      'POST /lobbies/join',
      'POST /lobbies/ready',
      'POST /players/connected',
      'POST /players/disconnected'
    ]
  },
  identity: {
    importantEndpoints: ['POST /identities', 'POST /game-links', 'GET /events/live']
  },
  chat: {
    importantEndpoints: []
  },
  group: {
    importantEndpoints: []
  },
  kv: {
    importantEndpoints: ['GET /entries', 'PUT /entries', 'DELETE /entries']
  },
  cloud: {
    importantEndpoints: [
      'POST /games/{game_id}/versions',
      'PUT /games/{game_id}/namespaces/{namespace_id}/version',
      'POST /games/{game_id}/namespaces'
    ]
  }
};

export async function generateApis() {
  let apiPages = {};

  // let specYaml = fs.readFileSync(`${backendPath}/gen/openapi/external/spec/openapi.yml`, 'utf8');
  // let spec = YAML.parse(specYaml, { maxAliasCount: -1 });
  let spec = await flattenOpenAPISpec(`${backendPath}/gen/openapi/external/spec/openapi.yml`);

  for (let product in products) {
    fs.rmSync(apiPath(product), { recursive: true, force: true });
    fs.mkdirSync(apiPath(product), { recursive: true });
  }

  for (let pathName in spec.paths) {
    for (let method in spec.paths[pathName]) {
      let specPath = spec.paths[pathName][method];

      console.log('Registering', method, pathName);

      let url = specPath.servers[0].url;
      let fullUrl = url + pathName;

      // TODO: Hack
      let product = url.replace('https://', '').replace('.api.rivet.gg/v1', '');
      let productConfig = products[product];
      if (!productConfig) continue;

      let indexableName = `${method.toUpperCase()} ${pathName}`;
      let importantIndex = productConfig.importantEndpoints.indexOf(indexableName);
      let isImportant = importantIndex != -1;

      // Remove product prefix from operation ID
      let operationIdStripped = specPath.operationId.replace(`${product}_`, '');

      // Generate title
      let title = operationIdStripped.replace(/_/g, '.');
      if (isImportant) title = '⭐️ ' + title;

      let hasRequestBody = specPath.requestBody?.content['application/json']?.schema;

      let file = `
import { CodeGroup, Code } from '@/components/Code';
import { DocsJsonSchemaViewer } from '@/components/DocsJsonSchemaViewer';

# ${title}

## Description

${specPath.description}

`;

      // Code examples
      let curlCommand;
      if (hasRequestBody) {
        curlCommand = `# Write the request body to body.json before running\ncurl -X ${method.toUpperCase()} -d '@body.json' '${fullUrl}'`;
      } else {
        curlCommand = `curl -X ${method.toUpperCase()} '${fullUrl}'`;
      }
      file += `
## Code Examples

<CodeGroup title='Request' tag='${method.toUpperCase()}' label='${fullUrl}'>

\`\`\`bash {{ title: 'cURL' }}
${curlCommand}
\`\`\`

\`\`\`ts
// Create Rivet client
import { RivetClient } from '@rivet-gg/api';
const RIVET = new RivetClient({ token: addYourTokenHere });

// Make request
await RIVET.${specPath.operationId.replace(/_/g, '.')}({
  // Add your request body here
});
\`\`\`

</CodeGroup>

`;

      // Request parameters
      if (specPath.parameters) {
        // Don't include the schema because it's not useful
        file += `
## Request Parameters

`;
        for (let parameter of specPath.parameters) {
          file += `
### ${parameter.name}

_${parameter.in == 'path' ? 'Path parameter' : 'Query parameter'}, ${
            parameter.required ? 'required' : 'optional'
          }_


${parameter.description || parameter.schema.description || ''}

`;
        }
      }

      // Request body
      if (hasRequestBody) {
        if (specPath.requestBody?.content['application/json'].schema) {
          file += `
## Request Body

<DocsJsonSchemaViewer schema={${JSON.stringify(specPath.requestBody?.content['application/json'].schema)}} />

`;
        } else {
          file += `
## Request Body

_Empty request body._
`;
        }
      }

      // Response body
      if (specPath.responses['200']?.content['application/json']?.schema) {
        file += `
## Response Body

<DocsJsonSchemaViewer schema={${JSON.stringify(
          specPath.responses['200'].content['application/json'].schema
        )}} />

`;
      } else {
        file += `
## Response Body

_Empty response body._
`;
      }

      let fileName = camelToKebab(operationIdStripped.replace(/\_/g, '/'));
      let filePath = `${apiPath(product)}/${fileName}`;
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // Sort by grouping similar endpoints together and move important endpoints first
      let sortingKey = `${isImportant ? '0' : `999 ${importantIndex}`} ${pathName} ${method}`;

      fs.writeFileSync(`${filePath}.mdx`, file);

      // Write config
      apiPages[product] = apiPages[product] || { pages: [] };
      apiPages[product].pages.push({
        href: `/docs/${product}/api/${fileName}`,
        sortingKey
      });
    }
  }

  // Sort pages
  for (let product in apiPages) {
    apiPages[product].pages.sort((a, b) => {
      if (a.sortingKey < b.sortingKey) return -1;
      else if (a.sortingKey > b.sortingKey) return 1;
      else return 0;
    });
  }

  fs.writeFileSync('src/generated/apiPages.json', JSON.stringify(apiPages, null, 2));
}

function camelToKebab(input) {
  return input.replace(/(.)([A-Z])/g, '$1-$2').toLowerCase();
}

// Reads a schema and flattens $refs.
async function flattenOpenAPISpec(specPath) {
  const fileContents = fs.readFileSync(specPath, 'utf8');
  const spec = YAML.parse(fileContents, { maxAliasCount: -1 });

  let schemas = spec.components.schemas;

  for (let pathKey in spec.paths) {
    let path = spec.paths[pathKey];

    for (let methodKey in path) {
      let method = path[methodKey];

      if (method.requestBody?.content) {
        let requestBodySchema = method.requestBody.content['application/json'].schema;
        method.requestBody.content['application/json'].schema = flattenRefs(requestBodySchema, schemas);
      }

      for (let response in method.responses) {
        if (!method.responses[response].content) continue;
        let responseSchema = method.responses[response].content['application/json'].schema;

        method.responses[response].content['application/json'].schema = flattenRefs(responseSchema, schemas);
      }
    }
  }

  return spec;
}

/// Flattens $ref in to the root object. We use this for exposing the full schema in the docs.
function flattenRefs(schema, schemas) {
  // Exclude if deprecated
  if (schema?.deprecated || schema?.description?.indexOf('Deprecated') >= 0) return null;

  // Iterate properties
  if (schema?.properties) {
    for (let property in schema.properties) {
      schema.properties[property] = flattenRefs(schema.properties[property], schemas);
    }
  }

  // Iterate parameters
  if (schema?.parameters) {
    for (let parameter in schema.parameters) {
      schema.parameters[parameter].schema = flattenRefs(schema.parameters[parameter].schema, schemas);
    }
  }

  // Iterate arrays
  if (schema?.items) {
    schema.items = flattenRefs(schema.items, schemas);
  }

  // Resolve refs
  if (schema?.$ref) {
    let ref = schema.$ref;
    let refPath = ref.replace('#/components/schemas/', '');
    let refSchema = JSON.parse(JSON.stringify(flattenRefs(schemas[refPath], schemas)));
    if (schema.description) refSchema.description = schema.description;
    return refSchema;
  }

  // No ref
  return schema;
}

// async function loadOpenAPISpec(specPath) {
//   console.log('Loading', specPath)
//   try {
//     return spec;
//   } catch (error) {
//     throw new Error(`Error loading OpenAPI spec: ${error}`);
//   }
// }

// async function resolveRefs(schema, baseSchema) {
//   if (typeof schema == 'object' && '$ref' in schema) {
//     const refUrl = schema.$ref;
//     const refSchema = await resolveRef(refUrl, baseSchema);
//     return resolveRefs(refSchema, baseSchema);
//   } else if (Array.isArray(schema)) {
//     const resolvedItems = await Promise.all(schema.map(async item => await resolveRefs(item, baseSchema)));
//     return resolvedItems;
//   } else if (typeof schema === 'object' && schema !== null) {
//     const resolvedObject = {};
//     for (const [key, value] of Object.entries(schema)) {
//       const resolvedValue = await resolveRefs(value, baseSchema);
//       resolvedObject[key] = resolvedValue;
//     }
//     return resolvedObject;
//   } else {
//     return schema;
//   }
// }

// async function resolveRef(refUrl, baseSchema) {
//   const schemaName = refUrl.split('#/components/schemas/')[1];
//   return baseSchema.components.schemas[schemaName];
// }

// function flattenRefs(schema) {
//   if (typeof schema == 'object' && '$ref' in schema) {
//     const refUrl = schema.$ref;
//     const refName = refUrl.substring(refUrl.lastIndexOf('/') + 1);
//     return { $ref: refName };
//   } else if (Array.isArray(schema)) {
//     return schema.map(item => flattenRefs(item));
//   } else if (typeof schema === 'object' && schema !== null) {
//     const flattenedObject = {};
//     for (const [key, value] of Object.entries(schema)) {
//       const flattenedValue = flattenRefs(value);
//       Object.assign(flattenedObject, flattenedValue);
//     }
//     return flattenedObject;
//   } else {
//     return schema;
//   }
// }

generateApis();

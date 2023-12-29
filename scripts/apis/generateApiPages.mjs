import fs from 'fs';
import path from 'path';

import { jsonToMarkdown } from './jsonToMarkdown.mjs';

function apiPath(product) {
  return `src/pages/docs/${product}/api`;
}

function camelToKebab(input) {
  return input.replace(/(.)([A-Z])/g, '$1-$2').toLowerCase();
}

let PRODUCTS = {
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

export async function generateApiPages(spec) {
  let apiPages = {};

  const apiBaseUrl = spec.servers[0].url;

  for (let product in PRODUCTS) {
    fs.rmSync(apiPath(product), { recursive: true, force: true });
    fs.mkdirSync(apiPath(product), { recursive: true });
  }

  for (let pathName in spec.paths) {
    for (let method in spec.paths[pathName]) {
      let specPath = spec.paths[pathName][method];

      console.log('Registering', method, pathName);

      let fullUrl = apiBaseUrl + pathName;

      // pathName = /product/.../...
      let [__, product, ...relativePath]  = pathName.split("/");
      let productConfig = PRODUCTS[product];
      if (!productConfig) continue;

      let indexableName = `${method.toUpperCase()} /${relativePath.join("/")}`;
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
### \`${parameter.name}\`

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

${jsonToMarkdown(specPath.requestBody?.content['application/json'].schema)}

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

${jsonToMarkdown(specPath.responses['200'].content['application/json'].schema)}

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

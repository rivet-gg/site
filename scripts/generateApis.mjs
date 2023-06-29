import fs from 'fs';
import YAML from 'yaml';

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

  let specYaml = fs.readFileSync(`${backendPath}/gen/openapi/external/spec/openapi.yml`, 'utf8');
  let spec = YAML.parse(specYaml, { maxAliasCount: -1 });

  for (let product in products) {
    fs.rmSync(apiPath(product), { recursive: true, force: true });
    fs.mkdirSync(apiPath(product), { recursive: true });
  }

  for (let pathName in spec.paths) {
    for (let method in spec.paths[pathName]) {
      let path = spec.paths[pathName][method];

      console.log('Registering', method, pathName);

      let url = path.servers[0].url;
      let fullUrl = url + pathName;

      // TODO: Hack
      let product = url.replace('https://', '').replace('.api.rivet.gg/v1', '');
      let productConfig = products[product];
      if (!productConfig) continue;

      let indexableName = `${method.toUpperCase()} ${pathName}`;
      let importantIndex = productConfig.importantEndpoints.indexOf(indexableName);
      let isImportant = importantIndex != -1;

      // Remove product prefix from operation ID
      let operationIdStripped = path.operationId.replace(`${product}_`, '');

      // Generate title
      let title = operationIdStripped.replace(/_/g, '.');
      if (isImportant) title = '⭐️ ' + title;

      let file = `# ${title}\n`;
      file += `\`\`\`\n${method.toUpperCase()} ${fullUrl}\n\`\`\`\n\n`;

      let curlCommand;
      if (method == 'post' || method == 'put') {
        curlCommand = `curl -X ${method.toUpperCase()} -d '@body.json' '${fullUrl}'`;
      } else {
        curlCommand = `curl -X ${method.toUpperCase()} '${fullUrl}'`;
      }
      file += `
{/*<RequestExample>
\`\`\`bash curl
${curlCommand}
\`\`\`
</RequestExample>*/}
`;

      let fileName = camelToKebab(operationIdStripped.replace(/\_/g, '-'));
      let filePath = new String(`${apiPath(product)}/${fileName}`);

      // Sort by grouping similar endpoints together and move important endpoints first
      let sortingKey = `${isImportant ? '0' : `999 ${importantIndex}`} ${pathName} ${method}`;

      fs.writeFileSync(`${filePath}.mdx`, file);

      // Write config
      apiPages[product] = apiPages[product] || { pages: [] };
      apiPages[product].pages.push({
        title,
        href: `/docs/${product}/api/${fileName}`,
        sortingKey,
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


generateApis();

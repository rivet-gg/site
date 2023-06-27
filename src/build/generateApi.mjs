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
    importantEndpoints: ['POST /identities', 'POST /game-links', 'GET /events/live']
  },
  group: {
    importantEndpoints: ['POST /identities', 'POST /game-links', 'GET /events/live']
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

export async function generateApi() {
  let specYaml = fs.readFileSync(`${backendPath}/gen/openapi/external/spec/openapi.yml`, 'utf8');
  let spec = YAML.parse(specYaml);

  for (let product in products) {
    fs.rmSync(apiPath(product), { recursive: true, force: true });
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

      let indexableName = `${method.toUpperCase()} ${pathName}`;
      let importantIndex = productConfig.importantEndpoints[product].indexOf(indexableName);
      let isImportant = importantIndex != -1;

      let title = path.operationId.replace(/_/g, '.');
      if (isImportant) title = '⭐️ ' + title;

      let file = `---\ntitle: "${title}"\nopenapi: "${method.toUpperCase()} ${pathName}"\n---\n\n`;

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

      let pathStripped = pathName.replace(/\/\{[^\}]+\}/g, '').replace(/\//g, '-');
      let filePath = new String(`${apiPath(product)}/api/${method}${pathStripped}`);

      // Sort by grouping similar endpoints together and move important endpoints first
      filePath.sortingKey = `${isImportant ? '0' : `999 ${importantIndex}`} ${pathName} ${method}`;

      fs.writeSync(`${filePath}.mdx`, file);

      apiTemplates[product].pages.push(filePath);
      apiTemplates[product].pages.sort((a, b) => {
        if (a.sortingKey < b.sortingKey) return -1;
        else if (a.sortingKey > b.sortingKey) return 1;
        else return 0;
      });
    }
  }

  return apiTemplates;
}

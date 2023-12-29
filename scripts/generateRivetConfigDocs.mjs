import fs from 'fs';

let backendPath = '../rivet';

function generateRivetConfigDocs() {
  let schema = JSON.parse(fs.readFileSync('public/rivet.schema.json', 'utf8'));
  let markdownContent = `# Configuration Schema\n\n`;

  for (const [key, value] of Object.entries(schema)) {
    markdownContent += `## ${key}\n`;
    markdownContent += `**Type**: ${value.type}\n\n`;
    markdownContent += `**Description**: ${value.description}\n\n`;
  }

  fs.writeFileSync(`${backendPath}/configDocs.mdx`, markdownContent);
}

generateGameConfigSchema();

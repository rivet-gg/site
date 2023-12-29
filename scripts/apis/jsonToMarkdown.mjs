/// Generates Markdown docs for a given JSON schema.
export function jsonToMarkdown(schema, heading = 3) {
  let h = '#'.repeat(heading);

  let markdownContent = "";

  function documentProperties(obj, path = "") {
    let entries = Object.entries(obj);
    entries.sort((a, b) => a[0].localeCompare(b[0]));

    for (const [key, value] of entries) {
      // Determine path for this key's header
      let fullPath;
      if (path == "") fullPath = key;
      else fullPath = `${path}.${key}`;

      if (!value) {
        // markdownContent += `## \`${fullPath}\`\n\n**Type:** null\n\n`;
        continue;
      }

      let required = schema.required?.includes(key) ?? false;

      markdownContent += `${h} \`${fullPath}\`\n\n`;
      markdownContent += `_${value.type || 'object'}${required ? ', required' : ''}_\n\n`;
      if (value.description) {
        markdownContent += `${value.description}\n\n`;
      }

      if (value.type == 'object' && value.properties) {
          documentProperties(value.properties, fullPath);
      } else if (value.type == 'object' && value.additionalProperties) {
          documentProperties(value.additionalProperties, `${fullPath}.*`);
      } else if (value.type == 'array' && value.items) {
        documentProperties(value.items, `${fullPath}[*]`);
      }
    }
  }

  if (schema.properties && typeof schema.properties === 'object') {
    documentProperties(schema.properties);
  } else {
    documentProperties(schema);
  }

  return markdownContent;
}

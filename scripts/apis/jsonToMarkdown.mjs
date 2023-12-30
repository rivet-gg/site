/// Generates Markdown docs for a given JSON schema.
export function jsonToMarkdown(schema, heading = 3) {
  let h = '#'.repeat(heading);

  let markdownContent = "";

  function documentProperty(value, required, path, skip = false) {
    if (!skip) {
      // Document property

      if (!value) {
        // markdownContent += `## \`${path}\`\n\n**Type:** null\n\n`;
        return;
      }

      let type = value.type || 'object';
      if (type == 'array') {
        type = `array\<${value.items?.type || 'object'}\>`;
      } else if (type == 'object' && value.additionalProperties){
        type = `map\<string, ${value.additionalProperties?.type || 'object'}\>`;
      }

      markdownContent += `${h} \`${path}\`\n\n`;
      markdownContent += `\`${type}\`${required ? " (required)" : ""}\n\n`;
      if (value.description) {
        markdownContent += `${value.description}\n\n`;
      }
    }

    // Recurse
    if (value.type == 'object' && value.properties) {
      let entries = Object.entries(value.properties);
      entries.sort((a, b) => a[0].localeCompare(b[0]));

      for (const [key, childValue] of entries) {
        let entryPath;
        if (path == "") entryPath = key;
        else entryPath = `${path}.${key}`;

        let required = value.required?.includes(key) ?? false;

        documentProperty(childValue, required, entryPath);
      }
    } else if (value.type == 'object' && value.additionalProperties) {
      documentProperty(value.additionalProperties, false, `${path}.<${getKeyName(path)}>`, true);
    } else if (value.type == 'array' && value.items) {
      documentProperty(value.items, false, `${path}[*]`, true);
    }

  }

  documentProperty(schema, true, "", true);

  return markdownContent;
}

function getKeyName(path) {
  let pathComponents = path.split('.');
  let lastComponent = pathComponents[pathComponents.length - 1];

  // Hardcoded
  switch (lastComponent) {
    case "env":
      return "key";
  }

  // YOLO it
  return stripSuffix(lastComponent, 's');
}

function stripSuffix(str, suffix) {
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}

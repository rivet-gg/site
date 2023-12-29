import fs from 'fs';
import path from 'path';

import { jsonToMarkdown } from './jsonToMarkdown.mjs';

export async function generateRivetSchemaPage(spec) {
  let file = "# rivet.yaml Specification\n\n";

  file += "## Naming\n\nWorkflow files must be name `rivet.yaml`, `rivet.toml`, or `rivet.json`. We recommend using YAML for your configuration since it is easiest to read/write and [provides validation & suggestions through our schema](https://github.com/redhat-developer/yaml-language-server).\n\n";
  file += "## Namespacing\n\nRivet configs can override properties by naming them `rivet.{namespace}.yaml`. For example, you can configure your generic config in `rivet.yaml` and override the properties for production in `rivet.prod.yaml`.\n\n";

  file += jsonToMarkdown(spec.components.schemas['CloudVersionConfig'], 2);

  fs.writeFileSync('src/pages/docs/general/rivet-config-spec.mdx', file);
}


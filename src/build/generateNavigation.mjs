import { writeFile, readFile } from 'fs/promises';
import { remark } from 'remark';

export async function generateNavigation() {
  let routes = [await buildRoute('docs'), await buildRoute('tutorials')];

  await writeFile('./src/generated/routes.json', JSON.stringify(routes), 'utf8');
}

async function buildRoute(path) {
  let navigation = JSON.parse(await readFile(`./src/pages/${path}/_navigation.json`, 'utf8'));

  // Update URLs
  let outputPages = [];
  for (let inputSection of navigation.pages) {
    let outputSection = { title: inputSection.title, pages: [] };
    outputPages.push(outputSection);

    for (let page of inputSection.pages) {
      if (page.startsWith('/')) throw new Error(`Link href should not start with a slash: ${page}`);

      let md = await readFile(`./src/pages/${path}/${page}.mdx`);

      let ast = remark().parse(md);
      let firstHeading = ast.children.find(node => node.type === 'heading');
      let title = '?';
      if (firstHeading) {
        title = firstHeading.children[0].value;
      }

      outputSection.pages.push({
        title,
        href: `/${path}/${page}`
      });
    }
  }

  return {
    prefix: `/${path}`,
    feedback: navigation.feedback,
    pages: outputPages
  };
}

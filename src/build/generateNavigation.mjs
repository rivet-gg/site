import { writeFile, readFile } from 'fs/promises'

export async function generateNavigation() {

  let routes = [
    await buildRoute('docs'),
    await buildRoute('tutorials'),
  ];

  await writeFile('./src/generated/routes.json', JSON.stringify(routes), 'utf8')
}

async function buildRoute(path) {
  let navigation = JSON.parse(await readFile(`./src/pages/${path}/_navigation.json`, 'utf8'));

  // Update URLs
  let outputPages = []
  for (let inputSection of navigation.pages) {
    let outputSection = { title: inputSection.title, links: [] };
    outputPages.push(outputSection);

    for (let page of inputSection.links) {
      if (page.startsWith('/')) throw new Error(`Link href should not start with a slash: ${page}`);
      let doc = await readFile(`./src/pages/${path}/${page}.mdx`)
      outputSection.links.push({
        title: "Test",
        href: `/${path}/${page}`,
      })
    }
  }

  return {
    prefix: `/${path}`,
    feedback: navigation.feedback,
    pages: outputPages
  };
}
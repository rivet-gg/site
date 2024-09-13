import { writeFile, readFile } from 'fs/promises';
import { remark } from 'remark';
import glob from 'fast-glob';
import errorPages from '../src/generated/errorPages.json' assert { type: 'json' };
import apiPages from '../src/generated/apiPages.json' assert { type: 'json' };
import engineStyles from '../src/lib/engineStyles.json' assert { type: 'json' };
import { slugifyWithCounter } from '@sindresorhus/slugify';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export async function generateNavigation() {
  // Process all pages
  let pages = {};
  let mdxFileNames = await glob(['pages/**/*.mdx', 'app/**/*.mdx'], {
    cwd: 'src'
  });
  for (let filename of mdxFileNames) {
    let href =
      '/' +
      filename
        .replace(/\/index\.mdx$/, '')
        .replace(/\.mdx$/, '')
        .replace(/^pages\//, '')
        .replace(/^app\//, '')
        .replace(/\/page$/, '')
        .replace('(posts)/', '');

    pages[href] = await processPage({ path: filename });
  }

  // Process all routes
  let routes = [];
  // let navigationFilenames = await glob(['**/_navigation.json'], {
  //   cwd: 'src/pages'
  // });
  let navigationFilenames = [];
  for (let filename of navigationFilenames) {
    let path = filename.replace(/\/_navigation\.json$/, '');
    routes.push(await buildRoute({ path, pages }));
  }

  // Sort by path descending to match most specific first
  routes.sort((a, b) => b.prefix.length - a.prefix.length);

  await writeFile('./src/generated/routes.json', JSON.stringify({ routes, pages }, null, 2), 'utf8');
}

async function processPage({ path }) {
  let md = await readFile(`src/${path}`);

  let ast = remark().parse(md);

  // Title
  let firstHeadingIndex = ast.children.findIndex(node => node.type === 'heading');
  let firstHeading = ast.children[firstHeadingIndex];
  let title = '';
  if (firstHeading) {
    title = firstHeading.children[0].value;
  }

  // Description
  let description = null;
  if (firstHeadingIndex !== -1) {
    for (let i = firstHeadingIndex + 1; i < ast.children.length; i++) {
      let node = ast.children[i];
      if (node.type === 'paragraph') {
        // Stop iterating once we reach a paragraph. Means there's a description.
        description = node.children[0].value;
        break;
      } else if (node.type === 'heading') {
        // Stop iterating once we reach a new heading. Means there's no description.
        break;
      }
    }
  }

  // Headings
  let slugify = slugifyWithCounter();
  let headings = [];
  // find all headings, remove the first one (the title)
  visit(ast, 'heading', node => {
    if (node.depth >= 2 && node.depth <= 3) {
      let parent = node.depth === 2 ? headings : headings[headings.length - 1].children;
      parent.push({
        title: toString(node),
        id: slugify(toString(node)),
        children: []
      });
    }
  });

  return {
    title,
    description,
    headings
  };
}

async function buildRoute({ path, pages }) {
  let input = JSON.parse(await readFile(`./src/pages/${path}/_navigation.json`, 'utf8'));

  let output = {
    title: input.title,
    prefix: `/${path}`,
    feedback: input.feedback ?? false,
    tableOfContents: {}
  };

  // Sidebar
  if (input.sidebar) {
    output.sidebar = { groups: [] };

    for (let inputGroup of input.sidebar.groups) {
      let outputGroup = { title: inputGroup.title, pages: [] };
      output.sidebar.groups.push(outputGroup);

      if (inputGroup.template?.errors) {
        // Errors
        outputGroup.pages.push(...errorPages);
      } else if (inputGroup.template?.api && apiPages[inputGroup.template.api]) {
        // API
        for (let page of apiPages[inputGroup.template.api].pages) {
          outputGroup.pages.push({
            href: page.href
          });
        }
      } else if (inputGroup.pages) {
        // Markdown pages
        for (let page of inputGroup.pages) {
          if (page.startsWith('/')) throw new Error(`Link href should not start with a slash: ${page}`);
          let href = `/${path}/${page}`;

          outputGroup.pages.push({
            href
          });

          if (!href.startsWith('/docs')) {
            output.tableOfContents[href] = false;
          }
        }
      }

      // Validate pages
      for (let page of outputGroup.pages) {
        if (!pages[page.href]) throw new Error(`Page not found: ${page.href}`);
      }
    }
  }

  // Tabs
  let pathSplit = path.split('/');
  if (pathSplit[0] === 'docs' && pathSplit.length > 1) {
    output.tabsTitle = 'Documentation';
    output.tabs = docsTabs(pathSplit);
  } else {
    output.tabs = null;
  }

  return output;
}

function docsTabs(path) {
  return [
    {
      title: 'General',
      href: '/docs/general',
      current: path[1] === 'general'
      // styles: engineStyles.godot
    },
    {
      title: 'Godot',
      // icon: 'godot',
      href: '/docs/godot',
      current: path[1] === 'godot'
      // styles: engineStyles.godot
    },
    {
      title: 'Unity',
      // icon: 'unity',
      href: '/docs/unity',
      current: path[1] === 'unity'
      // styles: engineStyles.unity
    },
    {
      title: 'Unreal',
      // icon: 'unreal',
      href: '/docs/unreal',
      current: path[1] === 'unreal'
      // styles: engineStyles.unreal
    },
    {
      title: 'HTML5',
      // icon: 'html5',
      href: '/docs/html5',
      current: path[1] === 'html5'
      // styles: engineStyles.html5
    },
    {
      title: 'Custom',
      // icon: 'custom',
      href: '/docs/custom',
      current: path[1] === 'custom'
      // styles: engineStyles.custom.text
    },
    {
      title: 'Low-Level API',
      href: '/docs/core',
      current: path[1] === 'core'
      // styles: engineStyles.godot
    }
  ];
}

await generateNavigation();

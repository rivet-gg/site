import { writeFile, readFile } from 'fs/promises';
import { remark } from 'remark';
import glob from 'fast-glob';
import errorPages from '../generated/errorPages.json' assert { type: 'json' };
import apiPages from '../generated/apiPages.json' assert { type: 'json' };

export async function generateNavigation() {
  // Process all pages
  let pages = {};
  let mdxFileNames = await glob(['**/*.mdx'], {
    cwd: 'src/pages'
  });
  for (let filename of mdxFileNames) {
    let href = '/' + filename.replace(/\/index\.mdx$/, '').replace(/\.mdx$/, '');
    pages[href] = await processPage({ path: filename });
  }

  // Process all routes
  let routes = [];
  let navigationFilenames = await glob(['**/_navigation.json'], {
    cwd: 'src/pages'
  });
  for (let filename of navigationFilenames) {
    let path = filename.replace(/\/_navigation\.json$/, '');
    routes.push(await buildRoute({ path }));
  }

  // Sort by path descending to match most specific first
  routes.sort((a, b) => b.prefix.length - a.prefix.length);

  await writeFile('./src/generated/routes.json', JSON.stringify({ routes, pages }, null, 2), 'utf8');
}

async function processPage({ path }) {
  let md = await readFile(`src/pages/${path}`);

  let ast = remark().parse(md);

  // Title
  let firstHeadingIndex = ast.children.findIndex(node => node.type === 'heading');
  let firstHeading = ast.children[firstHeadingIndex];
  let title = '';
  if (firstHeading) {
    title = firstHeading.children[0].value;
  }

  // Description
  let firstParagraph = ast.children[firstHeadingIndex + 1];
  let description = null;
  if (firstParagraph && firstParagraph.type === 'paragraph') {
    description = firstParagraph.children[0].value;
  }

  return {
    title,
    description
  };
}

async function buildRoute({ path }) {
  let input = JSON.parse(await readFile(`./src/pages/${path}/_navigation.json`, 'utf8'));

  let output = {
    title: input.title,
    prefix: `/${path}`,
    feedback: input.feedback ?? false
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
        for (let page of errorPages) {
          outputGroup.pages.push({
            href: page.href
          });
        }
      } else if (inputGroup.template?.api) {
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

          outputGroup.pages.push({
            href: `/${path}/${page}`
          });
        }
      }
    }
  }

  // Tabs
  let pathSplit = path.split('/');
  if (pathSplit[0] === 'docs') {
    output.tabsTitle = 'Documentation';
    output.tabs = docsTabs(pathSplit);
  } else if (pathSplit[0] === 'learn') {
    output.tabsTitle = 'Learn';
    output.tabs = learnTabs(pathSplit);
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
    },
    {
      title: 'Matchmaker',
      icon: 'matchmaker',
      href: '/docs/matchmaker',
      current: path[1] === 'matchmaker'
    },
    {
      title: 'Serverless Lobbies',
      icon: 'compute',
      href: '/docs/serverless-lobbies',
      current: path[1] === 'serverless-lobbies'
    },
    {
      title: 'CDN',
      icon: 'cdn',
      href: '/docs/cdn',
      current: path[1] === 'cdn'
    },
    {
      title: 'KV',
      icon: 'kv',
      href: '/docs/kv',
      current: path[1] === 'kv'
    },
    {
      title: 'Identity',
      icon: 'identity',
      href: '/docs/identity',
      current: path[1] === 'identity'
    },
    {
      title: 'Chat',
      icon: 'chat',
      href: '/docs/chat',
      current: path[1] === 'chat'
    },
    {
      title: 'Groups',
      icon: 'group',
      href: '/docs/group',
      current: path[1] === 'group'
    },
    {
      title: 'Cloud',
      href: '/docs/cloud',
      current: path[1] === 'cloud'
    }
  ];
}

function learnTabs(path) {
  return [
    {
      title: 'Introduction',
      href: '/learn',
      current: path.length == 1
    },
    {
      title: 'Unity',
      icon: 'unity',
      href: '/learn/unity',
      current: path[1] === 'unity'
    },
    {
      title: 'Unreal Engine',
      icon: 'unreal',
      href: '/learn/unreal',
      current: path[1] === 'unreal'
    },
    {
      title: 'Godot',
      icon: 'godot',
      href: '/learn/godot',
      current: path[1] === 'godot'
    },
    {
      title: 'HTML5',
      icon: 'html5',
      href: '/learn/html5',
      current: path[1] === 'html5'
    },
    {
      title: 'Custom',
      href: '/learn/custom',
      current: path[1] === 'custom'
    }
  ];
}

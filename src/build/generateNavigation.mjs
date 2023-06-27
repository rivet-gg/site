import { writeFile, readFile } from 'fs/promises';
import { remark } from 'remark';
import glob from 'fast-glob';

export async function generateNavigation({ errorPages }) {
  let routes = [];

  // Process all navigation in globs
  let navigationFilenames = await glob(['**/_navigation.json'], {
    cwd: 'src/pages'
  });
  for (let filename of navigationFilenames) {
    let path = filename.replace(/\/_navigation\.json$/, '');
    routes.push(await buildRoute({ path, errorPages }));
  }

  // Sort by path descending to match most specific first
  routes.sort((a, b) => b.prefix.length - a.prefix.length);

  await writeFile('./src/generated/routes.json', JSON.stringify(routes), 'utf8');
}

async function buildRoute({ path, errorPages }) {
  let input = JSON.parse(await readFile(`./src/pages/${path}/_navigation.json`, 'utf8'));

  let output = {
    prefix: `/${path}`,
    feedback: input.feedback ?? false
  };

  // Sidebar
  if (input.sidebar) {
    output.sidebar = { groups: [] };

    for (let inputGroup of input.sidebar.groups) {
      let outputGroup = { title: inputGroup.title, pages: [] };
      output.sidebar.groups.push(outputGroup);

      if (inputGroup.template == 'errors') {
        // Errors
        outputGroup.pages.push(...errorPages)
      } else if (inputGroup.pages) {
        // Pages
        for (let page of inputGroup.pages) {
          if (page.startsWith('/')) throw new Error(`Link href should not start with a slash: ${page}`);

          let md = await readFile(`./src/pages/${path}/${page}.mdx`);

          let ast = remark().parse(md);
          let firstHeading = ast.children.find(node => node.type === 'heading');
          let title = '?';
          if (firstHeading) {
            title = firstHeading.children[0].value;
          }

          outputGroup.pages.push({
            title,
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
      title: 'Identity',
      icon: 'identity',
      href: '/docs/identity',
      current: path[1] === 'identity'
    },
    {
      title: 'KV',
      icon: 'kv',
      href: '/docs/kv',
      current: path[1] === 'kv'
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

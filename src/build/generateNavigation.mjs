import { writeFile, readFile } from 'fs/promises';
import { remark } from 'remark';
import glob from 'fast-glob'

export async function generateNavigation() {
  let navigationFilenames = await glob(['**/_navigation.json'], {
    cwd: 'src/pages'
  });

  let routes = [];
  for (let filename of navigationFilenames) {
    let path = filename.replace(/\/_navigation\.json$/, '');
    routes.push(await buildRoute(path));
  }

  await writeFile('./src/generated/routes.json', JSON.stringify(routes), 'utf8');
}

async function buildRoute(path) {
  let input = JSON.parse(await readFile(`./src/pages/${path}/_navigation.json`, 'utf8'));


  let output = {
    prefix: `/${path}`,
    feedback: input.feedback ?? false,
  };

  // Sidebar
  if (input.sidebar) {
    output.sidebar = { groups: [] };

    for (let inputGroup of input.sidebar.groups) {
      let outputGroup = { title: inputGroup.title, pages: [] };
      output.sidebar.groups.push(outputGroup);

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

  // Tabs
  if (path.startsWith('docs/')) {
    output.tabs = docsTabs();
  } else if (path.startsWith('tutorial/')) {
    output.tabs = tutorialTabs();
  } else {
    output.tabs = null;
  }

  return output;
}

function docsTabs() {
return [
    {
      title: 'Overview',
      href: '#',
      current: true,
    },
    {
      title: 'Matchmaker',
      href: '#',
      current: false,
    },
    {
      title: 'Serverless Lobbies',
      href: '#',
      current: false,
    },
    {
      title: 'CDN',
      href: '#',
      current: false,
    },
    {
      title: 'Identity',
      href: '#',
      current: false,
    },
    {
      title: 'KV',
      href: '#',
      current: false,
    },
    {
      title: 'Cloud',
      href: '#',
      current: false,
    },
  ];
}

function tutorialTabs() {
return [
    {
      title: 'Overview',
      href: '#',
      current: true,
    },
    {
      title: 'Unity',
      href: '#',
      current: false,
    },
    {
      title: 'Unreal Engine',
      href: '#',
      current: false,
    },
    {
      title: 'Godot',
      href: '#',
      current: false,
    },
    {
      title: 'HTML5',
      href: '#',
      current: false,
    },
    {
      title: 'Custom',
      href: '#',
      current: false,
    },
  ];

}
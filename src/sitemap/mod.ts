import { SidebarSection, Sitemap } from '@/lib/sitemap';
import { common } from '@/sitemap/common';

export const sitemap = [
  {
    title: 'Godot',
    href: '/docs/godot',
    sidebar: [
      { href: '/docs/godot', icon: 'square-info' },
      { href: '/docs/godot/tutorials/quickstart', icon: 'rocket'  },
      {
        title: 'Concepts',
        pages: [{ href: '/docs/godot/concepts/resources' }]
      },
      ...common('/docs/godot')
    ]
  },
  {
    title: 'Unity',
    href: '/docs/unity',
    sidebar: [
      { href: '/docs/unity', icon: 'square-info'  },
      { href: '/docs/unity/tutorials/quickstart-fishnet', icon: 'rocket' },
      ...common('/docs/unity')
    ]
  },
  {
    title: 'Unreal',
    href: '/docs/unreal',
    sidebar: [
      { href: '/docs/unreal', icon: 'square-info'  },
      { href: '/docs/unreal/tutorials/quickstart', icon: 'rocket'  },
      {
        title: 'Concepts',
        pages: [
          // { href: '/docs/unreal/concepts/run-methods' },
          { href: '/docs/unreal/concepts/resources' },
          {
            title: 'Troubleshooting',
            collapsible: true,
            pages: [
              { href: '/docs/unreal/troubleshooting/chmod-error' },
              { href: '/docs/unreal/troubleshooting/empty-level' },
              { href: '/docs/unreal/troubleshooting/port-7777-already-taken' },
              { href: '/docs/unreal/troubleshooting/standalone-wrong-map' }
            ]
          },
          {
            title: 'Advanced',
            collapsible: true,
            pages: [
              { href: '/docs/unreal/concepts/build-engine-from-source' },
              { href: '/docs/unreal/concepts/useful-commands' },
            ]
          }
        ]
      },
      ...common('/docs/unreal')
    ]
  },
  {
    title: 'HTML5',
    href: '/docs/html5',
    sidebar: [
      { href: '/docs/html5', icon: 'square-info'  },
      { href: '/docs/html5/tutorials/quickstart', icon: 'rocket'  },
      ...common('/docs/html5')
    ]
  },
  {
    title: 'Custom',
    href: '/docs/custom',
    sidebar: [
      { href: '/docs/custom', icon: 'square-info'  },
      ...common('/docs/custom')
    ]
  },
  {
    title: 'Core',
    href: '/docs/general',
    sidebar: common('/docs')
  }
] satisfies Sitemap;

import { Sitemap } from '@/lib/sitemap';
import { advanced, common, developingModules, platforms, usingModules } from '@/sitemap/common';

export const sitemap = [
  {
    title: 'Godot',
    href: '/docs/godot',
    sidebar: [
      { href: '/docs/godot', icon: 'square-info' },
      {
        title: 'Multiplayer',
        pages: [
          { href: '/docs/godot/tutorials/quickstart', icon: 'rocket' },
          {
            title: 'Concepts',
            collapsible: true,
            pages: [{ href: '/docs/godot/concepts/resources' }]
          }
        ]
      },
      ...common('/docs/godot')
    ]
  },
  {
    title: 'Unity',
    href: '/docs/unity',
    sidebar: [
      { href: '/docs/unity', icon: 'square-info' },
      {
        title: 'Multiplayer',
        pages: [{ href: '/docs/unity/tutorials/quickstart-fishnet', icon: 'rocket' }]
      },
      ...common('/docs/unity')
    ]
  },
  {
    title: 'Unreal',
    href: '/docs/unreal',
    sidebar: [
      { href: '/docs/unreal', icon: 'square-info' },
      {
        title: 'Multiplayer',
        pages: [
          { href: '/docs/unreal/tutorials/quickstart', icon: 'rocket' },
          {
            title: 'Concepts',
            collapsible: true,
            pages: [
              // { href: '/docs/unreal/concepts/run-methods' },
              { href: '/docs/unreal/concepts/resources' },
              { href: '/docs/unreal/concepts/build-engine-from-source' },
              { href: '/docs/unreal/concepts/useful-commands' }
            ]
          },
          {
            title: 'Troubleshooting',
            collapsible: true,
            pages: [
              { href: '/docs/unreal/troubleshooting/chmod-error' },
              { href: '/docs/unreal/troubleshooting/empty-level' },
              { href: '/docs/unreal/troubleshooting/port-7777-already-taken' },
              { href: '/docs/unreal/troubleshooting/standalone-wrong-map' }
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
      { href: '/docs/html5', icon: 'square-info' },
      {
        title: 'Multiplayer',
        pages: [
          { href: '/docs/html5/tutorials/quickstart-nodejs', icon: 'rocket' },
          { href: '/docs/html5/tutorials/example-nodejs', icon: 'image' },
        ]
      },
      ...common('/docs/html5')
    ]
  },
  {
    title: 'Custom',
    href: '/docs/custom',
    sidebar: [{ href: '/docs/custom', icon: 'square-info' }, ...common('/docs/custom')]
  },
  {
    title: 'Core',
    href: '/docs/general',
    sidebar: [{ href: '/docs/general', icon: 'square-info' }, ...common('/docs/general')]
  },
  {
    title: 'Rivet Modules',
    href: '/docs/modules',
    sidebar: [
      ...usingModules('/docs').pages,
      developingModules('/docs'),
      platforms('/docs/modules'),
      advanced('/docs/modules')
    ]
  }
] satisfies Sitemap;

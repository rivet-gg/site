import { Sitemap } from '@/lib/sitemap';

export const sitemap = [
  {
    title: 'General',
    href: '/docs/general',
    sidebar: [
      { href: '/docs/general' },
      { title: 'General', pages: [{ href: '/docs/general/libraries' }] },
      {
        title: 'Concepts',
        pages: [
          {
            href: '/docs/general/concepts/authoritative-vs-p2p'
          }
        ]
      },
      {
        title: 'FAQ',
        pages: [
          { href: '/docs/general/faq/who-is-rivet-built-for' },
          { href: '/docs/general/faq/who-is-rivet-not-built-for' }
        ]
      }
    ]
  },
  {
    title: 'Godot',
    href: '/docs/godot',
    sidebar: [
      { href: '/docs/godot' },
      {
        title: 'Concepts',
        pages: [{ href: '/docs/godot/concepts/resources' }]
      },
      {
        title: 'Tutorials',
        pages: [{ href: '/docs/godot/tutorials/crash-course' }, { href: '/docs/godot/tutorials/bomber-demo' }]
      }
    ]
  },
  {
    title: 'Unity',
    href: '/docs/unity',
    sidebar: [
      { href: '/docs/unity' },
      {
        title: 'Tutorials',
        pages: [{ href: '/docs/unity/tutorials/fishnet/crash-course' }]
      }
    ]
  },
  {
    title: 'Unreal',
    href: '/docs/unreal'
  },
  {
    title: 'HTML5',
    href: '/docs/html5'
  },
  {
    title: 'Modules',
    href: '/docs/modules'
  }
] satisfies Sitemap;

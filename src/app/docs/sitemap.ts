import { Sitemap } from '@/lib/sitemap';

export const sitemap = [
  {
    title: 'General',
    href: '/docs/general',
    sidebar: [
      { title: 'Introduction', href: '/docs/general' },
      { title: 'General', pages: [{ title: 'Libraries', href: '/docs/general/libraries' }] },
      {
        title: 'Concepts',
        pages: [
          {
            title: 'Authoritative vs peer-to-peer networking',
            href: '/docs/general/concepts/authoritative-vs-p2p'
          }
        ]
      }
    ]
  },
  {
    title: 'Godot',
    href: '/docs/godot'
  },
  {
    title: 'Unity',
    href: '/docs/unity'
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

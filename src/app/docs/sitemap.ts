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

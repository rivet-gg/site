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
    href: '/docs/unreal',
    sidebar: [
      { href: '/docs/unreal' },
      {
        title: 'Concepts',
        pages: [
          { href: '/docs/unreal/concepts/resources' },
          { href: '/docs/unreal/concepts/build-engine-from-source' },
          { href: '/docs/unreal/concepts/run-methods' },
          { href: '/docs/unreal/concepts/useful-commands' }
        ]
      },
      {
        title: 'Troubleshooting',
        pages: [
          { href: '/docs/unreal/troubleshooting/chmod-error' },
          { href: '/docs/unreal/troubleshooting/empty-level' },
          { href: '/docs/unreal/troubleshooting/port-7777-already-taken' },
          { href: '/docs/unreal/troubleshooting/standalone-wrong-map' }
        ]
      },
      {
        title: '⏱️ Crash Course',
        pages: [
          { href: '/docs/unreal/tutorials/crash-course' },
          { href: '/docs/unreal/tutorials/crash-course/10-setup-project' },
          { href: '/docs/unreal/tutorials/crash-course/20-setup-rivet' },
          { href: '/docs/unreal/tutorials/crash-course/30-build-entry' },
          { href: '/docs/unreal/tutorials/crash-course/40-deploy-rivet' }
        ]
      }
    ]
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

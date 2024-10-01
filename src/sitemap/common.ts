import { SidebarSection, Sitemap } from '@/lib/sitemap';

import apiPages from '@/generated/apiPages.json' assert { type: 'json' };


export const common = (prefix: string = '/docs'): SidebarSection[] => [
  usingModules(prefix),
  developingModules(prefix),
  platforms(prefix),
  advanced(prefix)
];

const usingModules = (prefix: string = '/docs'): SidebarSection => ({
  title: 'Rivet Modules',
  pages: [
    { href: `${prefix}/general/modules`, icon: 'puzzle' },
    { href: `${prefix}/general/modules/categories/matchmaking`, icon: 'chess' },
    // { href: `${prefix}/general/modules/categories/parties`, icon: 'party-horn' },
    { href: `${prefix}/general/modules/categories/authentication`, icon: 'key' },
    { href: `${prefix}/general/modules/categories/social`, icon: 'share-nodes' },
    // { href: `${prefix}/general/modules/categories/competitive`, icon: 'ranking-star' },
    // { href: `${prefix}/general/modules/categories/economy`, icon: 'coin-front' },
    { href: `${prefix}/general/modules/categories/storage`, icon: 'floppy-disk' },
    {
      title: 'Advanced',
      collapsible: true,
      pages: [
        { href: `${prefix}/general/modules/project-config`, icon: 'square-sliders' },
        { href: `${prefix}/general/modules/cli`, icon: 'terminal' },
        { href: `${prefix}/general/modules/sdk`, icon: 'code' },
        { href: `${prefix}/general/modules/registries`, icon: 'share-nodes' },
        { href: `${prefix}/general/modules/multiple-games`, icon: 'object-intersect' },
        { href: `${prefix}/general/modules/environment-variables`, icon: 'leaf' }
      ]
    }
  ]
});

const developingModules = (prefix: string = '/docs'): SidebarSection => ({
  title: 'Developing Rivet Modules',
  pages: [
    {
      href: `${prefix}/general/modules/build`,
      icon: 'screwdriver-wrench'
    },
    { href: `${prefix}/general/modules/build/scripts`, icon: 'file-code' },
    { href: `${prefix}/general/modules/build/database`, icon: 'database' },
    { href: `${prefix}/general/modules/build/actors`, icon: 'bolt' },
    // TODO:
    // {
    //   href: `${prefix}/general/modules/build/user-config`,
    //   icon: 'paint-roller'
    // },
    { href: `${prefix}/general/modules/build/utility-modules`, icon: 'toolbox' },
    {
      title: 'Advanced',
      collapsible: true,
      pages: [
        { href: `${prefix}/general/modules/build/conventions` },
        { href: `${prefix}/general/modules/build/module-config` },
        { href: `${prefix}/general/modules/build/publish` },
        { href: `${prefix}/general/modules/build/errors` },
        { href: `${prefix}/general/modules/build/ide` },
        { href: `${prefix}/general/modules/build/public` },
        { href: `${prefix}/general/modules/build/logging` },
      ]
    }
  ]
});

const platforms = (prefix: string = '/docs'): SidebarSection => ({
  title: "Platforms",
  pages: [
    { href: `${prefix}/general/platforms/discord`, icon: 'discord' },
  ]
});

const advanced = (prefix: string = '/docs'): SidebarSection => ({
  title: 'Advanced',
  pages: [
    {
      title: 'Concepts',
      collapsible: true,
      pages: [
        { href: `${prefix}/general/concepts/authoritative-vs-p2p` }
      ]
    },
    {
      title: 'Reference',
      collapsible: true,
      pages: [
        { href: `${prefix}/general/errors` },
      ]
    },
    {
      title: 'Dynamic Servers',
      collapsible: true,
      pages: [
        { href: `${prefix}/general/dynamic-servers/overview` },
        {
          title: 'Concepts',
          collapsible: true,
          pages: [
            // { href: `${prefix}/general/dynamic-servers/architecture` },
            // { href: `${prefix}/general/dynamic-servers/billing` },
            { href: `${prefix}/general/dynamic-servers/crash-reporting` },
            // { href: `${prefix}/general/dynamic-servers/ddos` },
            // { href: `${prefix}/general/dynamic-servers/debugging-lobbies` },
            { href: `${prefix}/general/dynamic-servers/docker-root-user` },
            { href: `${prefix}/general/dynamic-servers/game-guard` },
            { href: `${prefix}/general/dynamic-servers/graceful-exit` },
            { href: `${prefix}/general/dynamic-servers/host-bridge-networking` },
            // { href: `${prefix}/general/dynamic-servers/instant-deploys` },
            // { href: `${prefix}/general/dynamic-servers/lifecycle` },
            // { href: `${prefix}/general/dynamic-servers/logging-metrics` },
            { href: `${prefix}/general/dynamic-servers/logging` },
            // { href: `${prefix}/general/dynamic-servers/managing-lobbies` },
            { href: `${prefix}/general/dynamic-servers/monitoring` },
            // { href: `${prefix}/general/dynamic-servers/one-lobby-one-container` },
            { href: `${prefix}/general/dynamic-servers/ports` },
            // { href: `${prefix}/general/dynamic-servers/resource-limits` },
            // { href: `${prefix}/general/dynamic-servers/ssl` }
          ]
        },
        {
          title: 'Reference',
          collapsible: true,
          pages: [
            { href: `${prefix}/general/dynamic-servers/protocols` },
            { href: `${prefix}/general/dynamic-servers/available-regions` },
            { href: `${prefix}/general/dynamic-servers/available-tiers` },
          ]
        },
        {
          title: 'API',
          collapsible: true,
          pages: apiPages["dynamic-servers"].pages.map(({ href }) => ({
            href: href.replace('/docs', prefix)
          }))
        }
      ],
    },
    {
      title: 'Cloud',
      collapsible: true,
      pages: [
        {
          title: 'API',
          collapsible: true,
          pages: apiPages.cloud.pages.map(({ href }) => ({
            href: href.replace('/docs', prefix)
          }))
        }
      ]
    }
  ]
});

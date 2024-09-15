import { SidebarSection, Sitemap } from "@/lib/sitemap";

import apiPages from "@/generated/apiPages.json" assert { type: "json" };

const common = (prefix: string = "/docs"): SidebarSection[] => [
  general(prefix),
  usingModules(prefix),
  developingModules(prefix),
  lowLevelApi(prefix),
];

const general = (prefix: string = "/docs"): SidebarSection => ({
  title: "General",
  collapsible: true,
  pages: [
    { title: "Introduction", href: `${prefix}/core` },
    {
      title: "Concepts",
      pages: [{ href: `${prefix}/core/concepts/authoritative-vs-p2p` }],
    },
  ],
});

const usingModules = (prefix: string = "/docs"): SidebarSection => ({
  title: "Modules",
  pages: [
    { href: `${prefix}/core/modules/quickstart`, icon: "rocket" },
    {
      href: `${prefix}/core/modules/project-config`,
      icon: "square-sliders",
    },
    { href: `${prefix}/core/modules/modules`, icon: "puzzle" },
    { href: `${prefix}/core/modules/sdk`, icon: "code" },
    {
      title: "Advanced",
      collapsible: true,
      pages: [
        { href: `${prefix}/core/modules/cli` },
        { href: `${prefix}/core/modules/registries`, icon: "share-nodes" },
        { href: `${prefix}/core/modules/multiple-games`, icon: "object-intersect" },
        { href: `${prefix}/core/modules/environment-variables`, icon: "leaf" }
      ]
    }
  ]
});

const developingModules = (prefix: string = "/docs"): SidebarSection => ({
  title: "Developing Modules",
  pages: [
    { href: `${prefix}/core/modules/build/overview`, icon: "square-info" },
    {
      href: `${prefix}/core/modules/build/quickstart`,
      icon: "screwdriver-wrench",
    },
    {
      href: `${prefix}/core/modules/build/module-config`,
      icon: "square-sliders",
    },
    { href: `${prefix}/core/modules/build/scripts`, icon: "file-code" },
    { href: `${prefix}/core/modules/build/database`, icon: "database" },
    { href: `${prefix}/core/modules/build/actors`, icon: "bolt" },
    {
      href: `${prefix}/core/modules/build/user-config`,
      icon: "paint-roller",
    },
    {
      href: `${prefix}/core/modules/build/errors`,
      icon: "triangle-exclamation",
    },
    { href: `${prefix}/core/modules/build/publish`, icon: "truck-fast" },
    {
      title: "Core Modules",
      collapsible: true,
      pages: [
        { href: `${prefix}/core/modules/build/core-modules` },
        { href: `/modules/tokens`, title: "Tokens" },
        { href: `/modules/rate-limit`, title: "Rate Limit" },
        { href: `/modules/uploads`, title: "Uploads" },
        { href: `/modules/analytics`, title: "Analytics" },
      ],
    },
    {
      title: "Advanced",
      collapsible: true,
      pages: [
        { href: `${prefix}/core/modules/build/conventions` },
        { href: `${prefix}/core/modules/build/ide` },
        { href: `${prefix}/core/modules/build/public` },
        { href: `${prefix}/core/modules/build/logging` },
      ],
    },
  ],
});

const lowLevelApi = (prefix: string = "/docs"): SidebarSection => ({
  title: "Low-Level API",
  collapsible: true,
  pages: [
    {  href: `${prefix}/core/errors` },
    {
      title: "Dynamic Servers",
      collapsible: true,
      pages: [
        { href: `${prefix}/core/dynamic-servers/overview` },
        { href: `${prefix}/core/dynamic-servers/architecture` },
        { href: `${prefix}/core/dynamic-servers/available-regions` },
        { href: `${prefix}/core/dynamic-servers/available-tiers` },
        { href: `${prefix}/core/dynamic-servers/billing` },
        { href: `${prefix}/core/dynamic-servers/crash-reporting` },
        { href: `${prefix}/core/dynamic-servers/ddos` },
        { href: `${prefix}/core/dynamic-servers/debugging-lobbies` },
        { href: `${prefix}/core/dynamic-servers/docker-root-user` },
        { href: `${prefix}/core/dynamic-servers/game-guard` },
        { href: `${prefix}/core/dynamic-servers/graceful-exit` },
        { href: `${prefix}/core/dynamic-servers/host-bridge-networking` },
        { href: `${prefix}/core/dynamic-servers/instant-deploys` },
        { href: `${prefix}/core/dynamic-servers/lifecycle` },
        { href: `${prefix}/core/dynamic-servers/logging-metrics` },
        { href: `${prefix}/core/dynamic-servers/logging` },
        { href: `${prefix}/core/dynamic-servers/managing-lobbies` },
        { href: `${prefix}/core/dynamic-servers/monitoring` },
        { href: `${prefix}/core/dynamic-servers/one-lobby-one-container` },
        { href: `${prefix}/core/dynamic-servers/ports` },
        { href: `${prefix}/core/dynamic-servers/protocols` },
        { href: `${prefix}/core/dynamic-servers/resource-limits` },
        { href: `${prefix}/core/dynamic-servers/ssl` },
      ],
    },
    {
      title: "Dynamic Servers API",
      collapsible: true,
      pages: apiPages["dynamic-servers"].pages.map(({ href }) => ({
        href: href.replace("/docs", prefix),
      })),
    },
    {
      title: "Tokens API",
      collapsible: true,
      pages: apiPages["game-tokens"].pages.map(({ href }) => ({
        href: href.replace("/docs", prefix),
      })),
    },
    {
      title: "Cloud API",
      collapsible: true,
      pages: apiPages.cloud.pages.map(({ href }) => ({
        href: href.replace("/docs", prefix),
      })),
    },
  ],
});

export const sitemap = [
  {
    title: "Godot",
    href: "/docs/godot",
    sidebar: [
      { href: "/docs/godot" },
      {
        title: "Concepts",
        pages: [{ href: "/docs/godot/concepts/resources" }],
      },
      {
        title: "Tutorials",
        pages: [
          { href: "/docs/godot/tutorials/crash-course" },
          {
            href: "/docs/godot/tutorials/bomber-demo",
          },
        ],
      },
      ...common("/docs/godot"),
    ],
  },
  {
    title: "Unity",
    href: "/docs/unity",
    sidebar: [
      { href: "/docs/unity" },
      {
        title: "Tutorials",
        pages: [{ href: "/docs/unity/tutorials/fishnet/crash-course" }],
      },
      ...common("/docs/godot"),
    ],
  },
  {
    title: "Unreal",
    href: "/docs/unreal",
    sidebar: [
      { href: "/docs/unreal" },
      {
        title: "Concepts",
        pages: [
          { href: "/docs/unreal/concepts/resources" },
          { href: "/docs/unreal/concepts/build-engine-from-source" },
          { href: "/docs/unreal/concepts/run-methods" },
          { href: "/docs/unreal/concepts/useful-commands" },
        ],
      },
      {
        title: "Troubleshooting",
        pages: [
          { href: "/docs/unreal/troubleshooting/chmod-error" },
          { href: "/docs/unreal/troubleshooting/empty-level" },
          { href: "/docs/unreal/troubleshooting/port-7777-already-taken" },
          { href: "/docs/unreal/troubleshooting/standalone-wrong-map" },
        ],
      },
      {
        title: "Crash Course",
        pages: [
          { href: "/docs/unreal/tutorials/crash-course" },
          { href: "/docs/unreal/tutorials/crash-course/10-setup-project" },
          { href: "/docs/unreal/tutorials/crash-course/20-setup-rivet" },
          { href: "/docs/unreal/tutorials/crash-course/30-build-entry" },
          { href: "/docs/unreal/tutorials/crash-course/40-deploy-rivet" },
        ],
      },
      ...common("/docs/godot"),
    ],
  },
  {
    title: "HTML5",
    href: "/docs/html5",
    sidebar: [
      { href: "/docs/html5" },
      {
        title: "Tutorials",
        pages: [
          { href: "/docs/html5/tutorials/crash-course" },
          { href: "/docs/html5/tutorials/tanks-canvas-socketio" },
        ],
      },
      ...common("/docs/godot"),
    ],
  },
  {
    title: "Core",
    href: "/docs/core",
    sidebar: common("/docs")
  }
] satisfies Sitemap;

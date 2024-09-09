import { SidebarSection, Sitemap } from "@/lib/sitemap";

const general = (prefix: string = "/docs"): SidebarSection => ({
  title: "General",
  collapsible: true,
  pages: [
    { title: "Introduction", href: `${prefix}/general` },
    { title: "Libraries", href: `${prefix}/general/libraries` },
    {
      title: "Concepts",
      pages: [{ href: `${prefix}/general/concepts/authoritative-vs-p2p` }],
    },
    {
      title: "FAQ",
      pages: [
        { href: `${prefix}/general/faq/who-is-rivet-built-for` },
        { href: `${prefix}/general/faq/who-is-rivet-not-built-for` },
      ],
    },
  ],
});

const lowLevelApi = (prefix: string = "/docs"): SidebarSection => ({
  title: "Low-Level API",
  collapsible: true,
  pages: [
    { title: "General", pages: [{ href: `${prefix}/core/errors` }] },
    {
      title: "Dynamic Servers",
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
      pages: [],
      "template": { "api": "dynamic-servers" },
    },
    {
      title: "Tokens API",
      pages: [],
      "template": { "api": "game-tokens" },
    },
    {
      title: "Cloud API",
      pages: [],
      "template": { "api": "cloud" },
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
        pages: [{ href: "/docs/godot/tutorials/crash-course" }, {
          href: "/docs/godot/tutorials/bomber-demo",
        }],
      },
      general("/docs/godot"),
      lowLevelApi("/docs/godot"),
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
      general("/docs/unity"),
      lowLevelApi("/docs/godot"),
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
        title: "⏱️ Crash Course",
        pages: [
          { href: "/docs/unreal/tutorials/crash-course" },
          { href: "/docs/unreal/tutorials/crash-course/10-setup-project" },
          { href: "/docs/unreal/tutorials/crash-course/20-setup-rivet" },
          { href: "/docs/unreal/tutorials/crash-course/30-build-entry" },
          { href: "/docs/unreal/tutorials/crash-course/40-deploy-rivet" },
        ],
      },
      general("/docs/unreal"),
      lowLevelApi("/docs/godot"),
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
      general("/docs/html5"),
      lowLevelApi("/docs/godot"),
    ],
  },
  {
    title: "Modules",
    href: "/docs/modules",
  },
] satisfies Sitemap;

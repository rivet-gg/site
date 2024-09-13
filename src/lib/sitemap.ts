import { Route } from 'next';

type SidebarTopLevelPage = { href: Route | URL };
type SidebarSection = { title: string; collapsible?: true; pages: { href: Route | URL }[] };

type SidebarItem = SidebarTopLevelPage | SidebarSection;

type SiteProduct = {
  title: string;
  href: Route | URL;
  sidebar?: SidebarItem[];
};

export type Sitemap = SiteProduct[];

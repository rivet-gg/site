import { Route } from "next";

type Href = string | Route | URL;
type Page = { href: string };
type PageWithTitle = { title: string; href: Href };
type PageWithPages = { title: string; pages: Page[] };

type SidebarTopLevelPage = Page;
export type SidebarSection = {
  title: string;
  collapsible?: true;
  pages: (Page | PageWithTitle | PageWithPages)[];
};

export type SidebarItem = SidebarTopLevelPage | SidebarSection;

type SiteProduct = {
  title: string;
  href: Href;
  sidebar?: SidebarItem[];
};

export type Sitemap = SiteProduct[];

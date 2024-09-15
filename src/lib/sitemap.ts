import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Route } from "next";

type Href = string | Route | URL;
type Page = { title?: string; href: Href; icon?: IconProp };
type PageWithTitle = { title: string; href: Href; icon?: IconProp };
type PageWithPages = {
  title: string;
  pages: Page[];
  collapsible?: true;
  initiallyOpen?: boolean;
  icon?: IconProp;
};

type SidebarTopLevelPage = Page;
export type SidebarSection = {
  title: string;
  collapsible?: true;
  initiallyOpen?: boolean;
  pages: (Page | PageWithTitle | PageWithPages)[];
};

export type SidebarItem = SidebarTopLevelPage | SidebarSection;

type SiteProduct = {
  title: string;
  href: Href;
  sidebar?: SidebarItem[];
};

export type Sitemap = SiteProduct[];

import { Route } from 'next';

export type Sitemap = {
  title: string;
  href: Route | URL;
  sidebar?: {
    title: string;
    href?: Route | URL;
    collapsible?: true;
    pages?: { title: string; href?: Route | URL }[];
  }[];
}[];

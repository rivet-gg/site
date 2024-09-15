import routes from '@/generated/routes.json';
import { SidebarItem } from '@/lib/sitemap';
import { getAliasedHref } from '@/lib/sameAs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@rivet-gg/components';
import { CollapsibleSidebarItem } from '@/components/CollapsibleSidebarItem';
import { ActiveLink } from '@/components/ActiveLink';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { type IconPack, library } from '@fortawesome/fontawesome-svg-core';

const fasFab: IconPack = Object.fromEntries(
  Object.entries(fab).map(([iconName, icon]) => [iconName, { ...icon, prefix: 'fas' }])
);

library.add(fasFab, fas);

interface TreeItemProps {
  item: SidebarItem;
}

function TreeItem({ item }: TreeItemProps) {
  if ('collapsible' in item && 'title' in item && 'pages' in item && item.collapsible) {
    return (
      <CollapsibleSidebarItem item={item}>
        <Tree pages={item.pages} />
      </CollapsibleSidebarItem>
    );
  }

  if ('title' in item && 'pages' in item) {
    return (
      <div>
        <p className='mt-2 px-2 py-1 text-sm font-semibold'>
          {item.icon ? <FontAwesomeIcon icon={item.icon} className='mr-2 size-3.5' /> : null}
          <span className='truncate'> {item.title}</span>
        </p>
        <Tree pages={item.pages} />
      </div>
    );
  }

  return (
    <NavLink href={item.href}>
      {item.icon ? <FontAwesomeIcon icon={item.icon} className='mr-2 size-3.5' /> : null}
      <span className='truncate'>{item.title ?? routes.pages[getAliasedHref(item.href)]?.title}</span>
    </NavLink>
  );
}

interface TreeProps {
  pages: SidebarItem[];
  className?: string;
}

export function Tree({ pages, className }: TreeProps) {
  return (
    <ul role='list' className={cn(className)}>
      {pages.map((item, index) => (
        <li key={index} className='relative'>
          <TreeItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export function NavLink({
  href,
  children,
  className
}: PropsWithChildren<{ href: string; children: ReactNode; className?: string }>) {
  return (
    <ActiveLink
      strict
      href={href}
      className={cn(
        'text-muted-foreground aria-current-page:text-foreground group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm hover:underline',
        className
      )}>
      {children}
    </ActiveLink>
  );
}

export function DocsNavigation({ sidebar }: { sidebar: SidebarItem[] }) {
  return (
    <div className='sticky top-docs-navigation pr-4 text-white md:max-h-tabs-content md:overflow-y-auto md:pb-4 md:pt-8'>
      <Tree pages={sidebar} />
    </div>
  );
}

function findActiveItem(pages: SidebarItem[] = [], href: string) {
  for (const page of pages) {
    if ('href' in page && page.href === href) {
      return page;
    }
    if ('pages' in page) {
      const found = findActiveItem(page.pages, href);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

export function markActiveCollapsibleItem(pages: SidebarItem[] = [], href: string) {
  for (const page of pages) {
    if ('collapsible' in page && page.collapsible) {
      const found = findActiveItem(page.pages, href);
      if (found) {
        page.initiallyOpen = true;
      }
    }
    if ('pages' in page) {
      markActiveCollapsibleItem(page.pages, href);
    }
  }
}

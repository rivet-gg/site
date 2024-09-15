'use client';
import routes from '@/generated/routes.json';
import { SidebarItem, SidebarSection } from '@/lib/sitemap';
import { getAliasedHref } from '@/lib/sameAs';
import { sitemap } from '@/sitemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/sharp-solid-svg-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, PropsWithChildren, ReactNode, useState } from 'react';
import { cn } from '@rivet-gg/components';
import { Header as RivetHeader } from '@rivet-gg/components/header';

interface TreeItemProps {
  item: SidebarItem;
}

function TreeItem({ item }: TreeItemProps) {
  if ('collapsible' in item && 'title' in item && 'pages' in item && item.collapsible) {
    return <AnimatedTreeItem item={item} />;
  }

  if ('title' in item && 'pages' in item) {
    return (
      <div>
        <p className='mt-2 px-2 py-1 text-sm font-semibold'>{item.title}</p>
        <Tree pages={item.pages} />
      </div>
    );
  }

  return (
    <NavLink href={item.href}>
      {item.icon ? <FontAwesomeIcon icon={item.icon} className='mr-2 size-3.5' /> : null}
      {item.title ?? routes.pages[getAliasedHref(item.href)]?.title}
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
  const pathname = usePathname() || '';
  const isCurrent = pathname === href;
  return (
    <>
      <Link
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        className={cn(
          'text-muted-foreground aria-current-page:text-foreground group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm hover:underline',
          className
        )}>
        <span className='truncate'>{children}</span>
      </Link>
    </>
  );
}

interface AnimatedTreeItemProps {
  item: SidebarSection;
}

export function AnimatedTreeItem({ item }: AnimatedTreeItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className='mt-2 flex w-full appearance-none items-center gap-4 px-2 py-1 text-sm font-semibold'
        onClick={() => setIsOpen(open => !open)}>
        {item.title}
        <motion.span
          initial={{ rotateZ: '-90deg' }}
          animate={{ rotateZ: isOpen ? 0 : '-90deg' }}
          className='-ml-1.5 mr-2 inline-block w-3.5'>
          <FontAwesomeIcon icon={faChevronDown} className='size-auto' />
        </motion.span>
      </button>
      <motion.div
        className='overflow-hidden pl-1'
        initial={false}
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          opacity: isOpen ? { delay: 0.3 } : {},
          height: !isOpen ? { delay: 0.3 } : {},
          duration: 0.3
        }}>
        <Tree pages={item.pages} />
      </motion.div>
    </div>
  );
}

export function DocsNavigation() {
  const pathname = usePathname() || '';

  const currentPage = sitemap.find(page => pathname.startsWith(page.href));

  if (!currentPage || !currentPage.sidebar) return null;

  return (
    <div className='sticky top-docs-navigation pr-4 text-white xl:max-h-tabs-content xl:overflow-y-auto xl:pb-4 xl:pt-8'>
      <Tree pages={currentPage.sidebar} />
    </div>
  );
}

const ENGINE_NAV_ITEM = {
  godot: (
    <RivetHeader.NavItem asChild>
      <Link href='/docs/godot'>Godot</Link>
    </RivetHeader.NavItem>
  ),
  unity: (
    <RivetHeader.NavItem asChild>
      <Link href='/docs/unity'>Unity</Link>
    </RivetHeader.NavItem>
  ),
  unreal: (
    <RivetHeader.NavItem asChild>
      <Link href='/docs/unreal'>Unreal</Link>
    </RivetHeader.NavItem>
  ),
  html5: (
    <RivetHeader.NavItem asChild>
      <Link href='/docs/html5'>HTML5</Link>
    </RivetHeader.NavItem>
  ),
  custom: (
    <RivetHeader.NavItem asChild>
      <Link href='/docs/custom'>Custom</Link>
    </RivetHeader.NavItem>
  )
};

export function DocsMobileNavigation() {
  const pathname = usePathname() || '';

  const currentPage = sitemap.find(page => pathname.startsWith(page.href));

  if (!currentPage || !currentPage.sidebar) {
    return (
      <div className='flex flex-col gap-6'>
        {Object.entries(ENGINE_NAV_ITEM).map(([key, value]) => value)}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      {Object.entries(ENGINE_NAV_ITEM).map(([key, value]) => {
        if (currentPage.href.includes(key)) {
          return (
            <div key={key}>
              {value} <Tree pages={currentPage.sidebar} className='mt-2' />
            </div>
          );
        }
        return <Fragment key={key}>{value}</Fragment>;
      })}
    </div>
  );
}

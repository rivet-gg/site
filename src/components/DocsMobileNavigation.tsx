'use client';

import { Tree } from '@/components/DocsNavigation';
import { sitemap } from '@/sitemap';
import { Header as RivetHeader } from '@rivet-gg/components/header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

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

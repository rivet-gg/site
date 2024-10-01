'use client';

import { ActiveLink } from '@/components/ActiveLink';
import { Tree } from '@/components/DocsNavigation';
import { sitemap } from '@/sitemap/mod';
import { Header as RivetHeader } from '@rivet-gg/components/header';
import { usePathname } from 'next/navigation';

function CoreNavigation() {}

const ENGINE_NAV_ITEM = {
  godot: (
    <RivetHeader.NavItem asChild>
      <ActiveLink href='/docs/godot'>Godot</ActiveLink>
    </RivetHeader.NavItem>
  ),
  unity: (
    <RivetHeader.NavItem asChild>
      <ActiveLink href='/docs/unity'>Unity</ActiveLink>
    </RivetHeader.NavItem>
  ),
  unreal: (
    <RivetHeader.NavItem asChild>
      <ActiveLink href='/docs/unreal'>Unreal</ActiveLink>
    </RivetHeader.NavItem>
  ),
  html5: (
    <RivetHeader.NavItem asChild>
      <ActiveLink href='/docs/html5'>HTML5</ActiveLink>
    </RivetHeader.NavItem>
  ),
  custom: (
    <RivetHeader.NavItem asChild>
      <ActiveLink href='/docs/custom'>Custom</ActiveLink>
    </RivetHeader.NavItem>
  )
};

export function DocsMobileNavigation() {
  const pathname = usePathname() || '';

  const currentPage = sitemap.find(page => pathname.startsWith(page.href));
  return (
    <>
      <RivetHeader.NavItem asChild className='flex items-center gap-1.5'>
        <ActiveLink href='/docs'>Docs</ActiveLink>
      </RivetHeader.NavItem>
      {Object.entries(ENGINE_NAV_ITEM).map(([key, value]) => {
        if (currentPage?.href.includes(key)) {
          return (
            <div key={key} className='ml-2'>
              {value} <Tree pages={currentPage.sidebar} className='mt-2' />
            </div>
          );
        }
        return (
          <div key={key} className='ml-2'>
            {value}
          </div>
        );
      })}
      <RivetHeader.NavItem asChild className='flex items-center gap-1.5'>
        <ActiveLink href='/modules'>Modules</ActiveLink>
      </RivetHeader.NavItem>
      <RivetHeader.NavItem asChild className='flex items-center gap-1.5'>
        <ActiveLink href='/changelog'>Changelog</ActiveLink>
      </RivetHeader.NavItem>
      <RivetHeader.NavItem asChild className='flex items-center gap-1.5'>
        <ActiveLink href='/pricing'>Pricing</ActiveLink>
      </RivetHeader.NavItem>
    </>
  );
}

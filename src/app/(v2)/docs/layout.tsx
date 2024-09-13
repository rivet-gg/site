import { Header } from '@/components/v2/Header';
import { Footer } from '@/components/Footer';
import { sitemap } from '@/sitemap';
import { DocsMobileNavigation, DocsNavigation } from '@/components/DocsNavigation';
import { ModulePageLink } from '@/components/ModulePageLink';
import Link from 'next/link';

function Subnav() {
  return (
    <div className='-mx-8 -mb-[9px] hidden min-h-10 items-center px-8 empty:hidden md:flex'>
      <ModulePageLink href='/docs/godot'>Godot</ModulePageLink>
      <ModulePageLink href='/docs/unity'>Unity</ModulePageLink>
      <ModulePageLink href='/docs/unreal'>Unreal</ModulePageLink>
      <ModulePageLink href='/docs/html5'>HTML5</ModulePageLink>
      <ModulePageLink href='/docs/custom'>Custom</ModulePageLink>
    </div>
  );
}

function MobileBreadcrumbs() {
  return (
    <>
      <DocsMobileNavigation />
    </>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Header active='docs' subnav={<Subnav />} mobileBreadcrumbs={<MobileBreadcrumbs />} />
      <div className='flex w-full'>
        <div className='xl:grid-cols-docs mx-auto flex flex-col xl:grid xl:px-6'>
          <aside className='hidden xl:block'>
            <DocsNavigation />
          </aside>
          {children}
        </div>
      </div>
    </>
  );
}

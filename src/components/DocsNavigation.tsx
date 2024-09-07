'use client';
import { usePathname } from 'next/navigation';
import { sitemap } from '@/app/docs/sitemap';
import routes from '@/generated/routes.json';
import { ActiveSectionMarker } from '@/components/TableOfContents';
import Link from 'next/link';

export function DocsNavigation() {
  const pathname = usePathname() || '';

  const currentPage = sitemap.find(page => pathname.startsWith(page.href));

  if (!currentPage || !currentPage.sidebar) return null;

  return (
    <ul role='list' className='sticky top-docs-navigation text-white xl:pt-8'>
      {currentPage.sidebar.map((item, index) => (
        <li key={index} className='relative mb-4'>
          {'title' in item ? (
            <a href={item.href} className='font-sans text-xs font-semibold text-white'>
              {item.title}
            </a>
          ) : (
            <NavLink href={item.href}>{routes.pages[item.href]?.title}</NavLink>
          )}
          {'pages' in item && item.pages && (
            <ul className='ml-4 mt-1'>
              {item.pages.map((page, index) => (
                <li key={index} className='relative'>
                  <div className='relative'>
                    <NavLink href={page.href}>{routes.pages[page.href]?.title}</NavLink>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname() || '';
  const isCurrent = pathname === href;
  return (
    <>
      {isCurrent ? <ActiveSectionMarker prefix='fafa' /> : null}
      <Link
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        className='flex justify-between gap-2 py-1 pl-3 text-sm text-charcole-400 transition hover:text-white aria-current-page:text-white'>
        <span className='truncate'>{children}</span>
      </Link>
    </>
  );
}

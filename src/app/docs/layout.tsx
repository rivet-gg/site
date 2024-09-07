import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { sitemap } from '@/app/docs/sitemap';
import { DocsNavigation } from '@/components/DocsNavigation';
import { TableOfContents } from '@/components/TableOfContents';

export default async function Layout({ children }) {
  return (
    <div>
      <Header className='sticky top-0' tabs={sitemap} tabsTitle='Documentation' />
      <div className='main-content-container flex min-h-[50vh] flex-col px-6 xl:grid xl:grid-cols-two-sidebars'>
        <aside className='hidden flex-shrink-0 border-r border-cream-100/10 pr-4 xl:block'>
          <DocsNavigation />
        </aside>
        <main className='mx-auto mt-8 w-full max-w-3xl px-4 pb-8 lg:px-8'>{children}</main>
        <aside className='xl:w-atuo -order-1 mx-auto w-full max-w-3xl flex-shrink-0 pl-4 xl:order-none xl:mx-0 xl:w-auto xl:max-w-none'>
          <TableOfContents />
        </aside>
      </div>
      <Footer />
    </div>
  );
}

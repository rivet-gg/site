import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { sitemap } from '@/sitemap';
import { DocsNavigation } from '@/components/DocsNavigation';

export default function Layout({ children }) {
  return (
    <div>
      <Header
        // @ts-ignore
        className='sticky top-0'
        tabs={sitemap}
        tabsTitle='Documentation'
      />
      <div className='main-content-container flex min-h-[50vh] max-w-full flex-col px-6 xl:grid xl:grid-cols-two-sidebars'>
        <aside className='hidden min-w-0 flex-shrink-0 border-r  border-cream-100/10 xl:block'>
          <DocsNavigation />
        </aside>
        {children}
      </div>
      <Footer />
    </div>
  );
}

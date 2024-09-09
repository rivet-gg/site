import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { sitemap } from "@/app/docs/sitemap";
import { DocsNavigation } from "@/components/DocsNavigation";

export default function Layout({ children }) {
  return (
    <div>
      <Header
        className="sticky top-0"
        tabs={sitemap}
        tabsTitle="Documentation"
      />
      <div className="xl:grid xl:grid-cols-two-sidebars main-content-container flex min-h-[50vh] flex-col px-6 max-w-full">
        <aside className="hidden flex-shrink-0 border-r border-cream-100/10  xl:block min-w-0">
          <DocsNavigation />
        </aside>
        {children}
      </div>
      <Footer />
    </div>
  );
}

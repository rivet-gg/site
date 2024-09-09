"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { sitemap } from "@/app/docs/sitemap";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname() || "";

  const page = sitemap.find((product) => pathname.startsWith(product.href));

  return (
    <div>
      <Header
        className="sticky top-0"
        tabs={sitemap}
        tabsTitle="Documentation"
      />
      <div className="main-content-container flex min-h-[50vh] flex-col px-6">
        <main className="mx-auto mt-8 w-full pb-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

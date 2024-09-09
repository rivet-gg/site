import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CSSProperties } from "react";

export default function Layout({ children }) {
  return (
    <div>
      <Header
        className="sticky top-0"
        tabsTitle="Documentation"
      />
      <div
        className="main-content-container flex min-h-[50vh] flex-col px-6"
        style={{ "--header-height": "56px" } as CSSProperties}
      >
        <main className="mx-auto mt-8 w-full pb-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

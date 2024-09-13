"use client";
import routes from "@/generated/routes.json";
import { SidebarItem, SidebarSection } from "@/lib/sitemap";
import { getAliasedHref } from "@/lib/sameAs";
import { sitemap } from "@/app/docs/sitemap";
import { ActiveSectionMarker } from "@/components/TableOfContents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/sharp-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface TreeItemProps {
  item: SidebarItem;
}

function TreeItem({ item }: TreeItemProps) {
  if (
    "collapsible" in item && "title" in item && "pages" in item &&
    item.collapsible
  ) {
    return <AnimatedTreeItem item={item} />;
  }

  if ("title" in item && "pages" in item) {
    return (
      <div className="group group-has-[.group]:pl-2">
        <span className="font-sans text-xs font-semibold text-white">
          {item.title}
        </span>
        <Tree
          pages={item.pages}
          className="has-[.group]:border-l has-[.group]:border-white/10"
        />
      </div>
    );
  }

  return (
    <NavLink href={item.href}>
      {routes.pages[getAliasedHref(item.href)]?.title}
    </NavLink>
  );
}

interface TreeProps {
  pages: SidebarItem[];
  className?: string;
}

export function Tree({ pages, className }: TreeProps) {
  return (
    <ul role="list" className={className}>
      {pages.map((item, index) => (
        <li key={index} className="relative">
          <TreeItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export function NavLink({ href, children }) {
  const pathname = usePathname() || "";
  const isCurrent = pathname === href;
  return (
    <>
      {isCurrent ? <ActiveSectionMarker prefix="fafa" /> : null}
      <Link
        href={href}
        aria-current={isCurrent ? "page" : undefined}
        className="flex justify-between gap-2 py-1 pl-3 text-sm text-charcole-400 transition hover:text-white aria-current-page:text-white"
      >
        <span className="truncate">{children}</span>
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
    <div className="group group-has-[.group]:pl-2 w-full ">
      <button
        className="appearance-none font-sans text-xs font-semibold flex justify-between w-full text-white"
        onClick={() => setIsOpen((open) => !open)}
      >
        {item.title}
        <motion.span
          initial={{ rotateZ: "-90deg" }}
          animate={{ rotateZ: isOpen ? 0 : "-90deg" }}
          className="mr-2 -ml-1.5 inline-block"
        >
          <FontAwesomeIcon
            icon={faChevronDown}
          />
        </motion.span>
      </button>
      <motion.div
        className="overflow-hidden"
        initial={false}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{
          opacity: isOpen ? { delay: 0.3 } : {},
          height: !isOpen ? { delay: 0.3 } : {},
          duration: 0.3,
        }}
      >
        <Tree
          pages={item.pages}
          className="has-[.group]:border-l has-[.group]:border-white/10"
        />
      </motion.div>
    </div>
  );
}

export function DocsNavigation() {
  const pathname = usePathname() || "";

  const currentPage = sitemap.find((page) => pathname.startsWith(page.href));

  if (!currentPage || !currentPage.sidebar) return null;

  return (
    <div className="sticky top-docs-navigation pr-4 text-white xl:pt-8 xl:pb-4 xl:max-h-tabs-content xl:overflow-y-auto">
      <Tree pages={currentPage.sidebar} />
    </div>
  );
}

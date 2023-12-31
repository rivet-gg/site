import Link from 'next/link';
import { useState, useCallback } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { remToPx } from '@/lib/remToPx';

let MARGIN = remToPx(6);

function useCurrentSection(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id);
  let getHeadings = useCallback(tableOfContents => {
    return tableOfContents
      .flatMap(node => [node.id, ...node.children.map(child => child.id)])
      .map(id => {
        let el = document.getElementById(id);
        if (!el) return null;

        let style = window.getComputedStyle(el);
        let scrollMt = parseFloat(style.scrollMarginTop);

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
        return { id, top };
      })
      .filter(x => x !== null);
  }, []);

  useEffect(() => {
    if (tableOfContents.length === 0) return;
    let headings = getHeadings(tableOfContents);
    if (headings.length === 0) return;
    function onScroll() {
      let top = window.scrollY;
      let current = headings[0].id;
      for (let heading of headings) {
        if (top >= heading.top - MARGIN) {
          current = heading.id;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getHeadings, tableOfContents]);
  return currentSection;
}

function NavLink({ id, isActive, isAnchorLink = false, children }) {
  return (
    <>
      <Link
        href={`#${id}`}
        aria-current={isActive ? 'page' : undefined}
        className={clsx(
          'flex justify-between gap-2 py-1 pr-3 text-sm transition',
          isAnchorLink ? 'pl-7' : 'pl-4',
          isActive ? 'text-white' : 'text-charcole-400 hover:text-white'
        )}>
        <span className='truncate'>{children}</span>
      </Link>
    </>
  );
}

function ActiveSectionMarker() {
  return (
    <>
      <motion.div
        layout
        layoutId='current-background'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='absolute inset-0 -left-2 bg-charcole-800/2.5 will-change-transform dark:bg-white/2.5'
        style={{ borderRadius: 8 }}
      />
      <motion.div
        layout
        layoutId='current-line'
        className='absolute left-0 top-1 h-6 w-px bg-cream-500'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </>
  );
}

function Tree({ sections, isActive, depth = 0 }) {
  return (
    <>
      <motion.div layout className='absolute inset-y-0 left-2 w-px bg-charcole-950/10 dark:bg-white/5' />
      <ul role='list'>
        {sections.map(section => {
          const isCurrentSectionActive = isActive(section);
          return (
            <li key={section.id} className='relative'>
              <div className='relative'>
                {isCurrentSectionActive ? <ActiveSectionMarker /> : null}
                <NavLink key={section.id} id={section.id} isAnchorLink isActive={isCurrentSectionActive}>
                  {section.title}
                </NavLink>
              </div>

              {section.children.length > 0 ? (
                <div className='relative ml-5 mt-1 pl-2'>
                  <Tree sections={section.children} isActive={isActive} depth={depth + 1} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function TableOfContents({ tableOfContents }) {
  let currentSection = useCurrentSection(tableOfContents);
  if (!tableOfContents) {
    return null;
  }

  function isActive(section) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
  }

  return (
    <div className='relative mt-9 md:mt-7'>
      <motion.h2 layout='position' className='font-sans text-xs font-semibold text-white'>
        On this page
      </motion.h2>

      <div className='relative mt-3 pl-2'>
        <Tree sections={tableOfContents} isActive={isActive} />
      </div>
    </div>
  );
}

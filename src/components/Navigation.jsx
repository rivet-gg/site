import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import {
  faBooks,
  faCode,
  faCoin,
  faGraduationCap,
  faHammer,
  faNewspaper,
  faUserGroup
} from '@fortawesome/sharp-solid-svg-icons';
import routes from '@/generated/routes.json';

import { Button } from '@/components/Button';
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import { useSectionStore } from '@/components/SectionProvider';
import { Tag } from '@/components/Tag';
import { remToPx } from '@/lib/remToPx';

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current;
  return condition ? initialValue : value;
}

function TopLevelNavItem({ href, children }) {
  return (
    <li className='md:hidden'>
      <Link
        href={href}
        className='block py-1 text-sm transition text-charcole-400 hover:text-white'>
        {children}
      </Link>
    </li>
  );
}

function NavLink({ href, tag, active, isAnchorLink = false, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-white'
          : 'text-charcole-400 hover:text-white'
      )}>
      <span className='truncate'>{children}</span>
      {tag && (
        <Tag variant='small' color='zinc'>
          {tag}
        </Tag>
      )}
    </Link>
  );
}

function VisibleSectionHighlight({ group, pathname }) {
  let [sections, visibleSections] = useInitialValue(
    [useSectionStore(s => s.sections), useSectionStore(s => s.visibleSections)],
    useIsInsideMobileNavigation()
  );

  let isPresent = useIsPresent();
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(section => section.id === visibleSections[0])
  );
  let itemHeight = remToPx(2);
  let height = isPresent ? Math.max(1, visibleSections.length) * itemHeight : itemHeight;
  let top =
    group.pages.findIndex(link => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className='absolute inset-x-0 top-0 bg-charcole-800/2.5 will-change-transform dark:bg-white/2.5'
      style={{ borderRadius: 8, height, top }}
    />
  );
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2);
  let offset = remToPx(0.25);
  let activePageIndex = group.pages.findIndex(link => link.href === pathname);
  let top = offset + activePageIndex * itemHeight;

  return (
    <motion.div
      layout
      className='absolute left-2 h-6 w-px bg-cream-500'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  );
}

function NavigationGroup({ group, className }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation();
  let [router, sections] = useInitialValue(
    [useRouter(), useSectionStore(s => s.sections)],
    isInsideMobileNavigation
  );

  let isActiveGroup = group.pages.findIndex(link => link.href === router.pathname) !== -1;

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2 layout='position' className='text-xs font-semibold font-sans text-white'>
        {group.title}
      </motion.h2>
      <div className='relative mt-3 pl-2'>
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && <VisibleSectionHighlight group={group} pathname={router.pathname} />}
        </AnimatePresence>
        <motion.div layout className='absolute inset-y-0 left-2 w-px bg-charcole-950/10 dark:bg-white/5' />
        <AnimatePresence initial={false}>
          {isActiveGroup && <ActivePageMarker group={group} pathname={router.pathname} />}
        </AnimatePresence>
        <ul role='list' className='border-l border-transparent'>
          {group.pages.map(link => {
            let page = routes.pages[link.href];
            return (
              <motion.li key={link.href} layout='position' className='relative'>
                <NavLink href={link.href} active={link.href === router.pathname}>
                  {page.title}
                </NavLink>
                <AnimatePresence mode='popLayout' initial={false}>
                  {link.href === router.pathname && sections.length > 0 && (
                    <motion.ul
                      role='list'
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.1 }
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15 }
                      }}>
                      {sections.map(section => (
                        <li key={section.id}>
                          <NavLink href={`${link.href}#${section.id}`} tag={section.tag} isAnchorLink>
                            {section.title}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export function Navigation({ navigation, ...props }) {
  let overviewGroup = { title: '', pages: [{ title: 'Overview', href: navigation.prefix }] };

  return (
    <nav {...props}>
      <ul role='list'>
        {/* Header */}
        <TopLevelNavItem href='/learn' icon={faHammer}>
          Learn
        </TopLevelNavItem>
        <TopLevelNavItem href='/docs/general' icon={faBooks}>
          Docs
        </TopLevelNavItem>
        <TopLevelNavItem href='/blog' icon={faNewspaper}>
          Blog
        </TopLevelNavItem>
        <TopLevelNavItem href='/pricing' icon={faCoin}>
          Pricing
        </TopLevelNavItem>

        {/* Sidebar */}
        {navigation.sidebar
          ? [overviewGroup, ...navigation.sidebar.groups].map((group, groupIndex) => (
              <NavigationGroup key={group.title} group={group} className={groupIndex === 0 && 'md:mt-0'} />
            ))
          : null}
        <li className='sticky bottom-0 z-10 mt-6 min-[416px]:hidden'>
          <Button href='https://hub.rivet.gg' variant='secondary' className='w-full'>
            Open Rivet
          </Button>
        </li>
      </ul>
    </nav>
  );
}

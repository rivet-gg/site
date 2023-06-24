import { forwardRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { MobileNavigation, useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import { ModeToggle } from '@/components/ModeToggle';
import { MobileSearch, Search } from '@/components/Search';

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className='text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'>
        {children}
      </Link>
    </li>
  );
}

export const Header = forwardRef(function({ navigation, className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
  let isInsideMobileNavigation = useIsInsideMobileNavigation();

  let { scrollY } = useScroll();
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9]);
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed pointer-events-auto inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-6 transition sm:px-6 lg:z-30',
        !isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark
      }}>
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) && 'bg-zinc-900/7.5 dark:bg-white/7.5'
        )}
      />

      <div className='flex items-center gap-5 md:hidden'>
        <MobileNavigation navigation={navigation} />
        <Link href='/' aria-label='Home'>
          <Logo className='h-6' />
        </Link>
      </div>

      <div className='hidden md:flex gap-8'>
        <Link href='/' aria-label='Home'>
          <Logo className='h-6' />
        </Link>

        <ul role='list' className='flex items-center gap-6'>
          <TopLevelNavItem href='/tutorials'>Learn</TopLevelNavItem>
          <TopLevelNavItem href='/blog'>Blog</TopLevelNavItem>
          <TopLevelNavItem href='/pricing'>Pricing</TopLevelNavItem>
          <TopLevelNavItem href='/support'>Support</TopLevelNavItem>
        </ul>
      </div>

      <div className='flex items-center gap-5'>
        <Search />
        <div className='hidden lg:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15' />
        <div className='flex gap-4'>
          <MobileSearch />
          <ModeToggle />
        </div>
        <div className='hidden min-[416px]:contents'>
          <Button href='https://hub.rivet.gg' target='_blank'>
            Open Rivet
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

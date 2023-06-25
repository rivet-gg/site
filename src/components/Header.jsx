import { forwardRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { MobileNavigation, useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import { ModeToggle } from '@/components/ModeToggle';
import { MobileSearch, Search } from '@/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faGraduationCap, faUserGroup } from '@fortawesome/pro-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className='text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
      >
        {children}
      </Link>
    </li>
  );
}

function TopLevelNavPopover({ solutions, callsToAction, children }) {
  return (
    <Popover className='relative'>
      <Popover.Button className='-mr-1 inline-flex items-center gap-x-1 text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'>
        <span>{children}</span>
        <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute z-10 mt-5 flex w-screen max-w-max'>
          <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
            <div className='p-4'>{solutions}</div>
            <div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>{callsToAction}</div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function TopLevelNavPopoverSolution({ icon, href, title, description }) {
  return (
    <div key={title} className='group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50'>
      <div className='mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
        <FontAwesomeIcon
          icon={icon}
          className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
          aria-hidden='true'
        />
      </div>
      <div>
        <Link href={href} className='font-semibold text-gray-900'>
          {title}
          <span className='absolute inset-0' />
        </Link>
        <p className='mt-1 text-gray-600'>{description}</p>
      </div>
    </div>
  );
}

function TopLevelNavPopoverCallToAction({ icon, href, title }) {
  return (
    <Link
      key={title}
      href={href}
      className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100'
    >
      <FontAwesomeIcon icon={icon} className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
      {title}
    </Link>
  );
}

function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Header = forwardRef(function Header({ navigation, className }, ref) {
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
        'pointer-events-auto fixed inset-x-0 top-0 z-50 flex flex-col divide-y divide-zinc-900/10 transition md:dark:divide-white/15',
        !isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark
      }}
    >
      {/* Main header */}
      <div className='flex h-14 items-center justify-between gap-12 px-6 lg:z-30'>
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

        <div className='hidden gap-8 md:flex'>
          <Link href='/' aria-label='Home'>
            <Logo className='h-6' />
          </Link>

          <ul role='list' className='flex items-center gap-6'>
            <TopLevelNavPopover
              solutions={
                <>
                  <TopLevelNavPopoverSolution
                    icon={faGraduationCap}
                    href='/services'
                    title='Rivet Services'
                    description='Simple APIs for running multiplayer games'
                  />
                  <TopLevelNavPopoverSolution
                    icon={faCode}
                    href='/social'
                    title='Rivet Social'
                    description='Open community of millions of users across games & platforms'
                  />
                </>
              }
            >
              Products
            </TopLevelNavPopover>
            <TopLevelNavPopover
              solutions={
                <>
                  <TopLevelNavPopoverSolution
                    icon={faGraduationCap}
                    href='/tutorials'
                    title='Tutorials'
                    description='Hands-on learning with your engine of choice'
                  />
                  <TopLevelNavPopoverSolution
                    icon={faCode}
                    href='/docs'
                    title='Documentation'
                    description={`Read about how to use Rivet's services`}
                  />
                </>
              }
              callsToAction={
                <>
                  <TopLevelNavPopoverCallToAction
                    icon={faYoutube}
                    title='YouTube'
                    href='https://youtoube.com/@rivet-gg'
                  />
                  <TopLevelNavPopoverCallToAction icon={faUserGroup} title='Community' href='/support' />
                </>
              }
            >
              Learn
            </TopLevelNavPopover>
            <TopLevelNavItem href='/blog'>Blog</TopLevelNavItem>
            <TopLevelNavItem href='/pricing'>Pricing</TopLevelNavItem>
            <TopLevelNavItem href='/support'>Support</TopLevelNavItem>
          </ul>
        </div>

        <div className='flex items-center gap-5'>
          <Search />
          <div className='hidden md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15 lg:block' />
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
      </div>

      {/* Tabs */}
      {navigation.tabs && (
        <div className='hide-scrollbar h-12 overflow-x-scroll px-6'>
          <nav className='flex h-full space-x-8'>
            {/* Title */}
            <div className='text-md flex items-center font-semibold text-zinc-900 dark:text-white'>
              {navigation.tabsTitle}
            </div>

            {/* Tabs */}
            {navigation.tabs.map(tab => (
              <Link
                key={tab.title}
                href={tab.href}
                className={clsx(
                  tab.current
                    ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                    : 'border-transparent text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white',
                  'lh-full flex h-full items-center whitespace-nowrap border-b-2 px-1 pt-1 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </motion.div>
  );
});

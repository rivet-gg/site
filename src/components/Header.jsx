import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

import { Button } from '@/components/Button';
import { MobileNavigation, useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import { ModeToggle } from '@/components/ModeToggle';
import { MobileSearch, Search } from '@/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBooks,
  faCode,
  faCoin,
  faGraduationCap,
  faHammer,
  faNewspaper,
  faUserGroup
} from '@fortawesome/sharp-solid-svg-icons';
import { faGithub, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';

import imgCdnWhite from '@/images/products/cdn-white.svg';
import imgChatWhite from '@/images/products/chat-white.svg';
import imgComputeWhite from '@/images/products/compute-white.svg';
import imgGroupWhite from '@/images/products/group-white.svg';
import imgIdentityWhite from '@/images/products/identity-white.svg';
import imgKvWhite from '@/images/products/kv-white.svg';
import imgMatchmakerWhite from '@/images/products/matchmaker-white.svg';
import imgLogoText from '@/images/rivet-logos/icon-text-cream.svg';
import imgLogo from '@/images/rivet-logos/icon-cream.svg';

const ICONS = {
  // Products
  cdn: imgCdnWhite,
  chat: imgChatWhite,
  compute: imgComputeWhite,
  group: imgGroupWhite,
  identity: imgIdentityWhite,
  kv: imgKvWhite,
  matchmaker: imgMatchmakerWhite
};

function TopLevelNavItem({ href, initHref, icon, children }) {
  let router = useRouter();

  let current = router.pathname.startsWith(href);
  return (
    <Link
      href={initHref ?? href}
      className={clsx(
        current ? 'bg-white/5 text-white border-white/10' : 'text-cream-100 hover:bg-white/5 hover:text-white',
        'flex items-center gap-2.5 px-3.5 py-1.5 transition border border-1 border-transparent'
      )}>
      {icon ? <FontAwesomeIcon icon={icon} /> : null}
      <span className='font-display text-lg'>{children}</span>
    </Link>
  );
}

function TopLevelNavPopover({ solutions, callsToAction, children }) {
  return (
    <Popover className='relative'>
      <Popover.Button className='-mr-1 inline-flex items-center gap-x-1 text-sm leading-5 text-charcole-600 transition hover:text-charcole-900 dark:text-cream-400 dark:hover:text-white'>
        <span>{children}</span>
        {/* <ChevronDownIcon className='h-5 w-5' aria-hidden='true' /> */}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'>
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
          className='h-6 w-6 text-gray-600 group-hover:text-violet-600'
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
      className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100'>
      <FontAwesomeIcon icon={icon} className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
      {title}
    </Link>
  );
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
        'pointer-events-auto fixed inset-x-0 top-0 z-50 flex flex-col transition',
        !isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-charcole-950'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-charcole-950/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark
      }}>
      {/* Main header */}
      <div className='flex h-14 items-center justify-between gap-12 px-6 lg:z-30'>
        {/* TODO: Auto-show on scroll */}
        {/* <div
          className={clsx(
            'absolute inset-x-0 top-full h-px transition',
            (isInsideMobileNavigation || !mobileNavIsOpen) && 'bg-charcole-950/7.5 dark:bg-white/7.5'
          )}
        /> */}

        <div className='flex items-center gap-5 md:hidden'>
          <MobileNavigation navigation={navigation} />
          <Link href='/' aria-label='Home'>
            <Image src={imgLogo} alt='Rivet' className='h-6 w-auto' />
          </Link>
        </div>

        <div className='hidden items-center gap-4 md:flex'>
          <Link href='/' aria-label='Home'>
            <Image src={imgLogoText} alt='Rivet' className='h-6 w-auto' />
          </Link>

          <div className='flex items-center gap-1'>
            <TopLevelNavItem href='/learn' icon={faHammer}>
              Learn
            </TopLevelNavItem>
            <TopLevelNavItem href='/docs' initHref='/docs/general' icon={faBooks}>
              Docs
            </TopLevelNavItem>
            <TopLevelNavItem href='/blog' icon={faNewspaper}>
              Blog
            </TopLevelNavItem>
            <TopLevelNavItem href='/pricing' icon={faCoin}>
              Pricing
            </TopLevelNavItem>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          {/* Social icons */}
          {/* <div className='flex gap-1.5'> */}
          {[
            [faDiscord, 'https://discord.gg/aXYfyNxYVn'],
            [faGithub, 'https://github.com/rivet-gg/rivet']
          ].map(([icon, href]) => (
            <Link
              className='flex items-center justify-center p-1 opacity-75 transition hover:opacity-100'
              key={href}
              href={href}
              target='_blank'>
              <FontAwesomeIcon icon={icon} className='text-lg text-white' />
            </Link>
          ))}
          {/* </div> */}

          <Search />
          <MobileSearch />
          {/* <ModeToggle /> */}
          <div className='hidden min-[416px]:contents'>
            <Button href='https://hub.rivet.gg' variant='secondary'>
                Open Rivet
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {navigation.tabs && (
        <div className='hide-scrollbar h-12 overflow-x-scroll px-6'>
          {/* Border */}
          <div className='absolute inset-x-0 bottom-0 h-[2px] bg-cream-100/5'></div>

          <nav className='flex h-full space-x-8'>
            {/* Title */}
            <div className='text-md flex items-center font-display font-bold text-charcole-900 text-white'>
              {navigation.tabsTitle}
            </div>

            {/* Tabs */}
            {navigation.tabs.map(tab => (
              <Link
                key={tab.title}
                href={tab.href}
                className={clsx(
                  'lh-full flex h-full shrink-0 items-center gap-1 whitespace-nowrap border-b-2 px-1 pt-1 text-sm font-semibold transition',
                  tab.current
                    ? 'border-charcole-900 border-cream-50'
                    : 'border-transparent hover:border-charcole-900 hover:border-white opacity-80 hover:opacity-100',
                  tab.styles?.text ?? 'text-white',
                )}
                aria-current={tab.current ? 'page' : undefined}>
                {tab.icon ? <Image src={ICONS[tab.icon]} className='h-6 w-6' alt='Tab icon' /> : null}
                <span
                  className={clsx(
                  )}>
                  {tab.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </motion.div>
  );
});

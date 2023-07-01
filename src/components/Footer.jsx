import { forwardRef, Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Feedback } from '@/components/Feedback';

import imgLogo from '@/images/branding/white.svg';
import { faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const footer = {
  learn: [
    { name: 'Learn', href: '/learn' },
    { name: 'Documentation', href: '/docs' }
  ],
  company: [
    { name: 'Blog', href: '/blog' },
    { name: 'Support', href: '/support' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Status Page', href: 'https://rivet-gg.betteruptime.com/' }
  ],
  legal: [
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Acceptable Use', href: '/acceptable-use' }
  ],
  social: [
    {
      name: 'Discord',
      href: 'https://discord.gg/aXYfyNxYVn',
      icon: faDiscord
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/rivet_gg',
      icon: faTwitter
    },
    {
      name: 'GitHub',
      href: 'https://github.com/rivet-gg',
      icon: faGithub
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@rivet-gg',
      icon: faYoutube
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/72072261/',
      icon: faLinkedin
    },
  ]
};

function PageLink({ label, page, previous = false }) {
  return (
    <>
      <Button
        href={page.href}
        aria-label={`${label}: ${page.title}`}
        variant='secondary'
        arrow={previous ? 'left' : 'right'}>
        {label}
      </Button>
      <Link
        href={page.href}
        tabIndex={-1}
        aria-hidden='true'
        className='text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300'>
        {page.title}
      </Link>
    </>
  );
}

function PageNextPrevious({ navigation }) {
  let router = useRouter();
  let allPages = navigation.sidebar.groups.flatMap(group => group.pages);
  let currentPageIndex = allPages.findIndex(page => page.href === router.pathname);

  if (currentPageIndex === -1) {
    return null;
  }

  let previousPage = allPages[currentPageIndex - 1];
  let nextPage = allPages[currentPageIndex + 1];

  if (!previousPage && !nextPage) {
    return null;
  }

  return (
    <div className='flex mt-8'>
      {previousPage && (
        <div className='flex flex-col items-start gap-3'>
          <PageLink label='Previous' page={previousPage} previous />
        </div>
      )}
      {nextPage && (
        <div className='ml-auto flex flex-col items-end gap-3'>
          <PageLink label='Next' page={nextPage} />
        </div>
      )}
    </div>
  );
}

function SmallPrint() {
  return (
    <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
      <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
        <div className='space-y-8'>
          <Image className='h-7 w-7' src={imgLogo} alt='Rivet' />
          <p className='text-sm leading-6 text-gray-300'>
            All-in-one solution to deploy, scale, and operate your multiplayer game
          </p>
          <div className='flex space-x-6'>
            {footer.social.map(item => (
              <Link key={item.name} href={item.href} className='text-gray-500 hover:text-gray-400 text-xl'>
                <span className='sr-only'>{item.name}</span>
                <FontAwesomeIcon icon={item.icon} aria-hidden='true' />
              </Link>
            ))}
          </div>
        </div>
        <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
          <div className='md:grid md:grid-cols-2 md:gap-8'>
            <div>{/* Empty column placeholder */}</div>
            <div>
              <h3 className='text-sm font-semibold leading-6 text-white'>Learn</h3>
              <ul role='list' className='mt-6 space-y-4'>
                {footer.learn.map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className='text-sm leading-6 text-gray-300 hover:text-white'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='md:grid md:grid-cols-2 md:gap-8'>
            <div>
              <h3 className='text-sm font-semibold leading-6 text-white'>Company</h3>
              <ul role='list' className='mt-6 space-y-4'>
                {footer.company.map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className='text-sm leading-6 text-gray-300 hover:text-white'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='mt-10 md:mt-0'>
              <h3 className='text-sm font-semibold leading-6 text-white'>Legal</h3>
              <ul role='list' className='mt-6 space-y-4'>
                {footer.legal.map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className='text-sm leading-6 text-gray-300 hover:text-white'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24'>
        <p className='text-xs leading-5 text-gray-400'>
          &copy; {new Date().getFullYear()} Rivet Gaming, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export function Footer({ navigation }) {
  let router = useRouter();

  return (
    <div>
      {navigation.feedback && <Feedback />}
      {navigation.sidebar && <PageNextPrevious navigation={navigation} />}

      <footer aria-labelledby='footer-heading'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <SmallPrint />
      </footer>
    </div>
  );
}

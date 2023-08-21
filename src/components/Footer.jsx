import { forwardRef, Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Feedback } from '@/components/Feedback';

import imgLogo from '@/images/branding/white.svg';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const footer = {
  learn: [
    { name: 'Learn', href: '/learn' },
    { name: 'Documentation', href: '/docs/general' }
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
    }
  ]
};

function PageLink({ label, page, previous = false }) {
  return (
    <>
      <Button
        href={page.href}
        aria-label={`${label}: ${page.title}`}
        variant='secondary'
        arrow={previous ? 'left' : 'right'}
      >
        {label}
      </Button>
      <Link
        href={page.href}
        tabIndex={-1}
        aria-hidden='true'
        className='text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300'
      >
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
    <div className='mt-16 flex border-t border-white/10 pt-8'>
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
    <div className='mx-auto max-w-7xl pb-8 pt-16 sm:pt-20'>
      <div className='px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-2 xl:gap-8'>
        {/* Brands & links */}
        <div className='space-y-8'>
          {/* Logo */}
          <Image className='h-7 w-7' src={imgLogo} alt='Rivet' />
          <p className='text-sm leading-6 text-gray-300'>
            Open-source solution to deploy, scale, and operate your multiplayer game
          </p>

          {/* Social */}
          <div className='flex space-x-6'>
            {footer.social.map(item => (
              <Link key={item.name} href={item.href} className='text-xl text-gray-500 hover:text-gray-400'>
                <span className='sr-only'>{item.name}</span>
                <FontAwesomeIcon icon={item.icon} aria-hidden='true' />
              </Link>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 xl:mt-0'>
          <div>
            <div className='text-sm font-semibold leading-6 text-white'>Learn</div>
            <ul role='list' className='mt-3 space-y-2'>
              {footer.learn.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className='text-sm leading-4 text-gray-300 hover:text-white'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className='text-sm font-semibold leading-6 text-white'>Company</div>
            <ul role='list' className='mt-3 space-y-2'>
              {footer.company.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className='text-sm leading-4 text-gray-300 hover:text-white'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='mt-10 md:mt-0'>
            <div className='text-sm font-semibold leading-6 text-white'>Legal</div>
            <ul role='list' className='mt-3 space-y-2'>
              {footer.legal.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className='text-sm leading-4 text-gray-300 hover:text-white'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trademarks */}
      <div className='mt-6 text-2xs space-y-3 px-4 sm:px-6 md:mt-12 lg:px-8 italic leading-4 text-white/50 md:mt-12'>
        {/* Copied from https://unity.com/legal/branding-trademarks#:~:text=Use%20current%2C%20official%2C%20unmodified%20Unity%20Logos.&text=The%20Unity%20Logos%20may%20not,and%20consistent%20use%20is%20required. */}
        {`This website is not sponsored by or affiliated with Unity Technologies or its affiliates. Unity Trademark(s) are trademark(s) or registered trademark(s) of Unity Technologies or its affiliates in the U.S. and elsewhere.`}

        &nbsp;|&nbsp;

        {/* Genreated with GPT-4 */}
        {`This website is not sponsored by, affiliated with, or endorsed by Epic Games, Inc. or its affiliates. 'Unreal Engine' is a trademark or registered trademark of Epic Games, Inc. in the U.S.  and elsewhere.`}

        &nbsp;|&nbsp;

        {/* Generated with GPT-4 */}
        {/* Another shorter option is also available at https://www.w3.org/html/logo/faq.html */}
        {`The HTML5 Logo by the World Wide Web Consortium (W3C), used under a Creative Commons Attribution 3.0 License. `}
        <Link href='https://www.w3.org/html/logo/index.html' className='underline'>
          Source
        </Link>

        &nbsp;|&nbsp;

        {/* Genreated with GPT-4 */}
        {`The Godot Engine Logo by the Andrea Calabró, used under a Creative Commons Attribution 4.0 International License. `}
        <Link href='https://godotengine.org/press/' className='underline'>
          Source
        </Link>

        &nbsp;|&nbsp;

        {/* Copied from https://www.docker.com/legal/trademark-guidelines/ */}
        {`Docker and the Docker logo are trademarks or registered trademarks of Docker, Inc. in the United States and/or other countries. Docker, Inc. and other parties may also have trademark rights in other terms used herein.`}
      </div>

      {/* Footer */}
      <div className='mt-4 border-t border-white/10 px-4 pt-8 sm:px-6 md:mt-8 lg:px-8'>
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

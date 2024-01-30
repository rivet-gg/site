import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import GitHubButton from 'react-github-btn';
import { Footer, PageNextPrevious } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { TableOfContents } from '@/components/TableOfContents';
import { Prose } from '@/components/Prose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/sharp-solid-svg-icons';
import { HeroPattern } from '@/components/HeroPattern';
import { Feedback } from '@/components/Feedback';

export function Layout({ navigation, isTopPage, tableOfContents, prose, inset, children, sections = [] }) {
  return (
    <div>
      {/* Navigation */}
      <motion.header
        layoutScroll
        className='contents lg:pointer-events-none lg:fixed lg:inset-x-0 lg:z-40 lg:flex'>
        {/* Header */}
        <Header navigation={navigation} />
      </motion.header>

      {/* Body */}
      <div
        className={clsx(
          'relative',
          (prose || inset) && ' xl:px-0',
          navigation.tabs ? 'pt-navigation' : 'pt-14'
        )}>
        {(prose || inset) && isTopPage ? <HeroPattern /> : null}

        <div className={clsx({ 'w-full': prose || inset }, 'flex flex-col-reverse lg:flex-row')}>
          {navigation.sidebar ? (
            <aside
              className={clsx(
                `hidden lg:pointer-events-auto lg:sticky lg:top-navigation lg:max-h-tabs-content lg:min-h-tabs-content lg:w-full lg:max-w-xs lg:self-start lg:overflow-y-auto lg:border-r lg:border-charcole-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:block xl:max-w-sm`
              )}>
              <Navigation navigation={navigation} />
            </aside>
          ) : null}
          <main
            className={clsx(
              { 'lg:px- max-w-5xl px-4 lg:px-8': navigation.sidebar || tableOfContents },
              'mx-auto mt-9 w-full'
            )}>
            {prose ? <Prose as='article'>{children}</Prose> : children}

            {navigation.feedback || navigation.sidebar ? (
              <div className='mb-4 mt-20'>
                {navigation.sidebar ? <PageNextPrevious navigation={navigation} /> : null}
                {navigation.feedback ? <Feedback /> : null}
              </div>
            ) : null}
          </main>

          {/* Table of contents */}
          <TableOfContents />
        </div>

        <Footer />
      </div>
    </div>
  );
}

function StarPrompt() {
  let [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isStarHidden') == '1') {
      setIsHidden(true);
    }
  }, []);

  let onHide = () => {
    setIsHidden(true);
    localStorage.setItem('isStarHidden', '1');
  };

  return (
    <div className='fixed bottom-6 flex w-full justify-center'>
      <AnimatePresence>
        {!isHidden && (
          <motion.div
            className='mx-4 flex w-max rounded-full bg-charcole-950/80 backdrop-blur'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ ease: 'easeOut', duration: 0.4 }}>
            <div className='relative flex items-center justify-center rounded-full py-2 pl-4 pr-6 text-sm font-semibold text-cream-100 ring-1 ring-inset ring-white/10 sm:text-base'>
              <FontAwesomeIcon
                icon={faXmark}
                className='h-full cursor-pointer px-1 hover:text-white'
                onClick={onHide}
              />

              <div className='ml-2'>Rivet is open source!</div>

              {/* Hardcode the button height since the iframe has odd layout side effects */}
              <div className='ml-4 h-[28px]'>
                <GitHubButton
                  href='https://github.com/rivet-gg/rivet'
                  target='_blank'
                  data-color-scheme='no-preference: light; light: light; dark: light;'
                  data-size='large'
                  data-show-count='true'
                  aria-label='Star rivet-gg/rivet on GitHub'>
                  Star
                </GitHubButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

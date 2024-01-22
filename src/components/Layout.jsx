import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import GitHubButton from 'react-github-btn';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { TableOfContents } from '@/components/TableOfContents';
import { Prose } from '@/components/Prose';
import { SectionProvider } from '@/components/SectionProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/sharp-solid-svg-icons';

export function Layout({ navigation, tableOfContents, prose, inset, children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <div>
        {/* Navigation */}
        <motion.header
          layoutScroll
          className='contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex'>
          {/* Header */}
          <Header navigation={navigation} />
        </motion.header>

        {/* Body */}
        <div
          className={clsx(
            'relative',
            (prose || inset) && 'px-4 sm:px-6 lg:px-8',
            navigation.tabs ? 'pt-navigation' : 'pt-14'
          )}>
          <div
            className={clsx('min-h-[50vh]', {
              'xl:grid xl:grid-cols-table-of-contents': tableOfContents && !navigation.sidebar,
              'flex flex-col-reverse lg:grid lg:grid-cols-table-of-contents xl:grid-cols-two-sidebars':
                tableOfContents && navigation.sidebar,
              'xl:grid xl:grid-cols-sidebar': !tableOfContents && navigation.sidebar
            })}>
            {/* Sidebar */}
            {navigation.sidebar ? (
              <aside
                className={clsx(
                  `hidden lg:pointer-events-auto lg:sticky lg:top-navigation lg:max-h-content lg:w-72 lg:self-start  lg:overflow-y-auto lg:border-r lg:border-charcole-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:block xl:w-80`
                )}>
                <Navigation navigation={navigation} />
              </aside>
            ) : null}

            <main className={clsx((prose || inset) && 'min-w-0 px-2 md:px-10' || '', 'min-h-[50vh]')}>
              {prose ? (
                <Prose
                  as='article'
                  className={clsx('mx-auto mt-9 max-w-5xl', { 'lg:w-full': tableOfContents })}>
                  {children}
                </Prose>
              ) : (
                children
              )}

              <Footer navigation={navigation} />
            </main>
            {/* Table of contents */}
            {tableOfContents ? <TableOfContents tableOfContents={tableOfContents} /> : null}
          </div>
        </div>
      </div>
      {/* Star promp */}
      {/* <StarPrompt /> */}
    </SectionProvider>
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

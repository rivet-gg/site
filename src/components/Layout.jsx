import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import GitHubButton from 'react-github-btn';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Prose } from '@/components/Prose';
import { SectionProvider } from '@/components/SectionProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faXmark } from '@fortawesome/pro-solid-svg-icons';

export function Layout({ navigation, prose, children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <div className={clsx(navigation.sidebar && 'lg:ml-72 xl:ml-80')}>
        {/* Navigation */}
        <motion.header
          layoutScroll
          className='contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex'
        >
          {/* Header */}
          <Header navigation={navigation} />

          {/* Sidebar */}
          {navigation.sidebar ? (
            <div
              className={clsx(
                `contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80`,
                navigation.tabs ? 'mt-26' : 'mt-14'
              )}
            >
              <Navigation className='hidden lg:block' navigation={navigation} />
            </div>
          ) : null}
        </motion.header>

        {/* Body */}
        <div
          className={clsx('relative', prose && 'px-4 sm:px-6 lg:px-8', navigation.tabs ? 'pt-26' : 'pt-14')}
        >
          <main className={clsx(prose && 'py-16', 'min-h-[50vh]')}>
            {prose ? <Prose as='article'>{children}</Prose> : children}
          </main>
          <Footer navigation={navigation} />
        </div>
      </div>

      {/* Star promp */}
      <StarPrompt />
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
            className='mx-4 flex w-max rounded-full bg-zinc-900/80 backdrop-blur'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ ease: 'easeOut', duration: 0.4 }}
          >
            <div className='relative flex items-center justify-center rounded-full py-2 pl-4 pr-6 text-sm font-semibold text-slate-300 ring-1 ring-inset ring-white/10 sm:text-base'>
              <FontAwesomeIcon
                icon={faXmark}
                className='h-full cursor-pointer px-1 hover:text-white'
                onClick={onHide}
              />

              <div className='ml-2'>Rivet is now open source!</div>

              {/* Hardcode the button height since the iframe has odd layout side effects */}
              <div className='ml-4 h-[28px]'>
                <GitHubButton
                  href='https://github.com/rivet-gg/rivet'
                  target='_blank'
                  data-color-scheme='no-preference: light; light: light; dark: light;'
                  data-size='large'
                  data-show-count='true'
                  aria-label='Star rivet-gg/rivet on GitHub'
                >
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

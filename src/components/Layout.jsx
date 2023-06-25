import { motion } from 'framer-motion';
import clsx from 'clsx';
import { PostHogProvider} from 'posthog-js/react'

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Prose } from '@/components/Prose';
import { SectionProvider } from '@/components/SectionProvider';

const POSTHOG_API_KEY = 'phc_6kfTNEAVw7rn1LA51cO3D69FefbKupSWFaM7OUgEpEo';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Layout({ navigation, prose, children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <PostHogProvider apiKey={POSTHOG_API_KEY}>
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
          <main className={clsx(prose && 'py-16')}>
            {prose ? <Prose as='article'>{children}</Prose> : children}
          </main>
          <Footer navigation={navigation} />
        </div>
      </div>
      </PostHogProvider>
    </SectionProvider>
  );
}

import Link from 'next/link';
import { motion } from 'framer-motion';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';
import { Prose } from '@/components/Prose';
import { SectionProvider } from '@/components/SectionProvider';

export function Layout({ navigation, prose, children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <div className='lg:ml-72 xl:ml-80'>
        <motion.header
          layoutScroll
          className='contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex'
        >
          <Header navigation={navigation} />
          <div className='contents lg:pointer-events-auto mt-14 lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80'>
            <Navigation className='hidden lg:block' navigation={navigation} />
          </div>
        </motion.header>
        <div className={`relative ${prose ? 'px-4 pt-14 sm:px-6 lg:px-8' : ''}`}>
          <main className='py-16'>{prose ? <Prose as='article'>{children}</Prose> : children}</main>
          <Footer navigation={navigation} />
        </div>
      </div>
    </SectionProvider>
  );
}

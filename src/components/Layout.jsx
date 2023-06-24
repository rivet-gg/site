import Link from 'next/link';
import { motion } from 'framer-motion';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';
import { Prose } from '@/components/Prose';
import { SectionProvider } from '@/components/SectionProvider';

export const navigation = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: '/' },
      { title: 'Quickstart', href: '/quickstart' },
      { title: 'SDKs', href: '/sdks' },
      { title: 'Authentication', href: '/authentication' },
      { title: 'Pagination', href: '/pagination' },
      { title: 'Errors', href: '/errors' },
      { title: 'Webhooks', href: '/webhooks' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { title: 'Contacts', href: '/contacts' },
      { title: 'Conversations', href: '/conversations' },
      { title: 'Messages', href: '/messages' },
      { title: 'Groups', href: '/groups' },
      { title: 'Attachments', href: '/attachments' }
    ]
  }
];

export function Layout({ navigation, prose, children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <div className='lg:ml-72 xl:ml-80'>
        <motion.header
          layoutScroll
          className='contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex'
        >
          <div className='contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80'>
            <div className='hidden lg:flex'>
              <Link href='/' aria-label='Home'>
                <Logo className='h-6' />
              </Link>
            </div>
            <Header />
            <Navigation className='hidden lg:mt-10 lg:block' navigation={navigation} />
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

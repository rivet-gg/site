import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';

import { Layout } from '@/components/Layout';
import * as mdxComponents from '@/components/mdx';
import { useMobileNavigationStore } from '@/components/MobileNavigation';

import '@/styles/tailwind.css';
import 'focus-visible';

function onRouteChange() {
  useMobileNavigationStore.getState().close();
}

Router.events.on('routeChangeStart', onRouteChange);
Router.events.on('hashChangeStart', onRouteChange);

import docsNavigation from './docs/_navigation.json';
import tutorialsNavigation from './tutorials/_navigation.json';

export default function App({ Component, pageProps }) {
  let router = useRouter();

  let navigation;
  let feedback = false;
  let dir = router.pathname.split('/')[1];
  switch (dir) {
    case 'docs':
      navigation = docsNavigation;
      feedback = true;
      break;
    case 'tutorials':
      navigation = tutorialsNavigation;
      feedback = true;
      break;
    default:
      navigation = [];
      break;
  }

  // Update URLs
  navigation = structuredClone(navigation);
  for (let section of navigation) {
    for (let link of section.links) {
      if (!link.href.startsWith('/')) throw new Error(`Link href should not start with a slash: ${link.href}`);
      link.href = `/${dir}${link.href}`;
    }
  }

  return (
    <>
      <Head>
        {router.pathname === '/' ? <title>Rivet</title> : <title>{`${pageProps.title} - Rivet`}</title>}
        <meta name='description' content={pageProps.description} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout navigation={navigation} feedback={feedback} prose={Component.prose ?? true} {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  );
}

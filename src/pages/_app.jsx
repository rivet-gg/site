import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';

import { Layout } from '@/components/Layout';
import * as mdxComponents from '@/components/mdx';
import { useMobileNavigationStore } from '@/components/MobileNavigation';

import '@/styles/tailwind.css';
import 'focus-visible';
import routes from '@/generated/routes.json';

function onRouteChange() {
  useMobileNavigationStore.getState().close();
}

Router.events.on('routeChangeStart', onRouteChange);
Router.events.on('hashChangeStart', onRouteChange);

export default function App({ Component, pageProps }) {
  let router = useRouter();

  let navigation = routes.find(route => router.pathname.startsWith(route.prefix));
  if (!navigation) navigation = { feedback: false, pages: [] };

  let page = navigation.pages.flatMap(x => x.pages).find(page => page.href === router.pathname);
  let title = pageProps.title ?? page?.title ?? null;
  let description = pageProps.description ?? page?.description ?? null;

  navigation.tabs = [
    {
      title: 'Overview',
      href: '#',
      current: true,
    },
    {
      title: 'Matchmaker',
      href: '#',
      current: true,
    },
    {
      title: 'Serverless Lobbies',
      href: '#',
      current: true,
    },
    {
      title: 'CDN',
      href: '#',
      current: true,
    },
    {
      title: 'Identity',
      href: '#',
      current: true,
    },
    {
      title: 'KV',
      href: '#',
      current: true,
    },
    {
      title: 'Cloud',
      href: '#',
      current: true,
    },
  ];

  return (
    <>
      <Head>
        {title ? <title>{`${title} - Rivet`}</title> : <title>Rivet</title>}
        <meta name='description' content={description} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout navigation={navigation} prose={Component.prose ?? true} {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  );
}

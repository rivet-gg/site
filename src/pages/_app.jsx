import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';

import { Layout } from '@/components/Layout';
import * as mdxComponents from '@/components/mdx';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import { injectStyles } from '@stoplight/mosaic';

import '@/styles/tailwind.css';
import '@/styles/fonts.css';
import 'focus-visible';

import routes from '@/generated/routes.json';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function onRouteChange() {
  useMobileNavigationStore.getState().close();
}

Router.events.on('routeChangeStart', onRouteChange);
Router.events.on('hashChangeStart', onRouteChange);

export default function App({ Component, pageProps }) {
  injectStyles();

  let router = useRouter();

  let routes2 = JSON.parse(JSON.stringify(routes));
  let navigation = routes2.find(route => router.pathname.startsWith(route.prefix));
  if (!navigation) navigation = { prefix: '/', feedback: false };

  let page = navigation.sidebar
    ? navigation.sidebar.groups.flatMap(x => x.pages).find(page => page.href === router.pathname)
    : null;

  let title = pageProps.title ?? page?.title ?? null;
  title = title ? `${title} - Rivet` : 'Rivet';
  let description = pageProps.description ?? page?.description ?? null;
  console.log('page', page);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width' />

        <title>{title}</title>
        {description && <meta name='description' content={description} />}

        <meta property='og:title' content='{title}' />
        {description && <meta property='og:description' content='{dsecription}' />}

        <meta name='twitter:title' content='{title}' />
        {description && <meta property='twitter:description' content='{dsecription}' />}
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout navigation={navigation} prose={Component.prose ?? true} {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  );
}

import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';

import { Layout } from '@/components/Layout';
import * as mdxComponents from '@/components/mdx';
import { useMobileNavigationStore } from '@/components/MobileNavigation';

import '@/styles/tailwind.css';
import 'focus-visible';

import routes from '@/generated/routes.json';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/pro-solid-svg-icons'
library.add(fas)

function onRouteChange() {
  useMobileNavigationStore.getState().close();
}

Router.events.on('routeChangeStart', onRouteChange);
Router.events.on('hashChangeStart', onRouteChange);

export default function App({ Component, pageProps }) {
  let router = useRouter();

  let navigation = routes.find(route => router.pathname.startsWith(route.prefix));
  if (!navigation) navigation = { prefix: '/', feedback: false };

  let page = navigation.sidebar
    ? navigation.sidebar.groups.flatMap(x => x.pages).find(page => page.href === router.pathname)
    : null;
  let title = pageProps.title ?? page?.title ?? null;
  let description = pageProps.description ?? page?.description ?? null;

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

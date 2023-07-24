import { useEffect } from 'react';
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

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init('phc_6kfTNEAVw7rn1LA51cO3D69FefbKupSWFaM7OUgEpEo', {
    api_host: 'https://ph.rivet.gg',
    // Enable debug mode in development
    loaded: posthog => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    }
  });
}

function onRouteChange() {
  useMobileNavigationStore.getState().close();
}

Router.events.on('routeChangeStart', onRouteChange);
Router.events.on('hashChangeStart', onRouteChange);

export default function App({ Component, pageProps }) {
  injectStyles();

  let router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  let navigation = routes.routes.find(route => router.pathname.startsWith(route.prefix));
  if (!navigation) navigation = { prefix: '/', feedback: false };

  let page = routes.pages[router.pathname];

  let title = pageProps.title ?? Component.title ?? page?.title ?? null;
  title = title ? `${title} - Rivet` : 'Rivet';
  let description = pageProps.description ?? Component.description ?? page?.description ?? null;

  return (
    <>
      <PostHogProvider client={posthog}>
        <Head>
          <meta name='viewport' content='width=device-width' />

          {/* Add metadata. Blog `ArticleLayout` provides its own title. */}
          {!router.pathname.startsWith('/blog/') && (
            <>
              <title>{title}</title>
              {description && <meta name='description' content={description} />}

              <meta property='og:title' content={title} />
              {description && <meta property='og:description' content={description} />}

              <meta name='twitter:title' content={title} />
              {description && <meta property='twitter:description' content={description} />}
            </>
          )}
        </Head>
        <MDXProvider components={mdxComponents}>
          <Layout navigation={navigation} prose={Component.prose ?? true} {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </PostHogProvider>
    </>
  );
}

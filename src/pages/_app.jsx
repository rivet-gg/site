import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import 'focus-visible'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()

  return (
    <>
      <Head>
        {router.pathname === '/' ? (
          <title>Rivet</title>
        ) : (
          <title>{`${pageProps.title} - Rivet`}</title>
        )}
        <meta name="description" content={pageProps.description} />

        {/* Generated by realfavicongenerator.net */}
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png?v=3' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png?v=3' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png?v=3' />
        <link rel='manifest' href='/icons/site.webmanifest?v=3' />
        <link rel='mask-icon' href='/icons/safari-pinned-tab.svg?v=3' color='#151515' />
        <link rel='shortcut icon' href='/icons/favicon.ico?v=3' />
        <meta name='apple-mobile-web-app-title' content='Rivet' />
        <meta name='application-name' content='Rivet' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml?v=3' />
        <meta name='theme-color' content='#ffffff' />

        <meta property='og:title' content='Rivet' />
        <meta property='og:description' content='Rivet - Social Gaming' />
        <meta property='og:url' content='https://rivet.gg/' />
        {/* <!-- <meta property="og:image" content="https://rivet.gg/promo/thumbnail.png"> -->
        <!-- <meta property="og:image:alt" content="Rivet promotional banner"> -->
        <!-- <meta property="og:image:type" content="image/png"> --> */}
        <meta property='og:type' content='website' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@RivetGaming' />
        <meta name='twitter:title' content='Rivet' />
        {/* <!-- <meta name="twitter:description" content="Rivet - Social Gaming"> -->
        <!-- <meta name="twitter:image" content="https://rivet.gg/promo/full.png"> -->
        <!-- <meta name="twitter:image:alt" content="Rivet promotional banner"> --></meta> */}
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  )
}

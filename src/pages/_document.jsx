import { Head, Html, Main, NextScript } from 'next/document';

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    
    // Default to dark mode
    // let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)
    let isDarkMode = window.localStorage.isDarkMode === 'true' || true;

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;

const posthogScript = `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_H3Lu0VAHAbkwV15rQYUmFMJPVUcIOcAubxU7eztAzip',{api_host:'https://ph.rivet.gg'})
`;

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <script dangerouslySetInnerHTML={{ __html: posthogScript }} />

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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
      <body className='bg-white antialiased dark:bg-zinc-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

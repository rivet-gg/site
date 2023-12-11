# Rivet Site

[rivet.gg](https://rivet.gg)

## Project structure

```
game/             Demo game used on the landing page. This can be deployed via the Rivet CLI in game/server/.
public/           Static assets
  fonts/
  icons/          Favicons
  promo/          Assets used for promotional marketing
scripts/
src/
  authors/
  components/     Reusable components
  generated/      Content generated from the rivet-gg/rivet repo with scripts/generate*.js
  lib/            Helper libraries used at build time
  mdx/            "
  pages/          MDX & JSX content to serve as pages
  styles/         Static stylesheets (seldom used)
_redirects        https://developers.cloudflare.com/pages/platform/redirects/
```

## Developing

To get started with this template, first install the npm dependencies:

```bash
yarn install
yarn run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).


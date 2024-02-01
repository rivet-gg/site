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

## Running landing game locally

The landing page includes a Rivet game on it. The source code for the game client & server is in _game/_.

To configure the Rivet token, set the `NEXT_PUBLIC_RIVET_TOKEN` and `NEXT_PUBLIC_API_ENDPIONT` environment variables. By default, this will be disabled in development.

To test the game locally, run `cd game && rivet run server`, then pass a development token to `NEXT_PUBLIC_RIVET_TOKEN`.

To deploy the game, run `cd game && rivet deploy -n prod` then pass a public token to `NEXT_PUBLIC_RIVET_TOKEN`.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).


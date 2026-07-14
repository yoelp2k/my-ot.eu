# my-ot.eu

A small bilingual website for Maly Pinhas's occupational therapy practice, available in English and Hebrew.

- Live site: [my-ot.eu](https://my-ot.eu)
- Current GitHub Pages preview: [yoelp2k.github.io/my-ot.eu](https://yoelp2k.github.io/my-ot.eu/)

The site uses plain HTML and CSS. It has no client-side JavaScript, cookies, analytics, external fonts, or runtime dependencies.

## Structure

- `index.html` — English page
- `he/index.html` — Hebrew RTL page
- `style.css` — shared responsive styles
- `en.json` and `he.json` — canonical text used by the tests
- `maly-portrait.webp` — optimized portrait with camera and location metadata removed
- `test/site.test.js` — language, structure, design, and deployment checks

The language switcher uses ordinary links, so both versions work without JavaScript and remain accessible to search engines and assistive technology.

## Work locally

Node.js 20 or newer is required for the tests.

```sh
npm test
python3 -m http.server 8000
```

Then open [localhost:8000](http://localhost:8000). The Hebrew page is at `/he/`.

When editing text, update the relevant HTML page and its matching JSON file. Run the tests before committing so the two languages, navigation, and deployment configuration remain complete.

## Deployment

Pushes to `main` run the tests and deploy the static files through GitHub Actions. Pull requests run the same tests without publishing.

GitHub Pages must use **GitHub Actions** as its source. Configure `my-ot.eu` under **Settings → Pages → Custom domain**; the workflow does not require a repository `CNAME` file. Enable **Enforce HTTPS** after GitHub's DNS check succeeds.

DNS for the apex domain uses GitHub Pages' four `A` records. `www` should be a `CNAME` to `yoelp2k.github.io`. Preserve all Microsoft 365 mail records when editing DNS.

# My-OT

A lightweight bilingual website for Maly Pinhas's occupational therapy practice. The site is plain HTML and CSS, has no runtime dependencies, and publishes through GitHub Pages.

## Site structure

- `/` — English page
- `/he/` — Hebrew page
- `style.css` — shared responsive design
- `en.json` and `he.json` — canonical copies of the original text, used by the tests to prevent accidental content loss
- `maly-portrait.webp` — optimized portrait with the original camera metadata removed

The language selector uses ordinary links to separate static pages. This keeps both languages available to search engines, assistive technology, and visitors with JavaScript disabled.

## Local preview

Run the tests:

```sh
npm test
```

Preview the site from the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish safely with GitHub Pages

The workflow in `.github/workflows/pages.yml` tests and publishes the site whenever `main` changes. Pull requests run the same tests without deploying.

> [!IMPORTANT]
> Do not simply make this existing repository public. Older commits contain payment/banking text from the previous README and the original portrait with camera/GPS metadata. Deleting those files in the latest commit does not remove them from Git history.

The safest approach is to create a fresh public repository and copy this redesigned snapshot into it without the old history. If retaining this repository is essential, rewrite and verify its complete history before changing its visibility.

One-time setup in the new public repository:

1. Create a new public repository, for example `my-ot-site`, without a generated README or other starter files.
2. Copy this redesigned working tree into the new repository and push it as the first commit.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. Push to `main`. The **Test and deploy GitHub Pages** workflow will publish it.
6. The default project URL will use the form `https://yoelp2k.github.io/REPOSITORY-NAME/` until a custom domain is configured.

The old Azure workflows and version-bump branch automation have been removed. No Azure secret or `prod` branch is needed.

## Configure `my-ot.eu`

GitHub Pages custom workflows do not use a repository `CNAME` file. Configure the domain in the repository settings instead:

1. In your personal GitHub settings, open **Pages** and verify `my-ot.eu`. GitHub will provide a TXT record to add at your DNS provider. Keep that TXT record in place.
2. In this repository, open **Settings → Pages**, enter `my-ot.eu` under **Custom domain**, and save it before changing DNS.
3. At the DNS provider, add these four `A` records for the apex (`@`):

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

4. Add a `CNAME` record for `www` pointing to `yoelp2k.github.io` so GitHub can redirect `www.my-ot.eu` to the apex domain.
5. Remove conflicting old Azure `A`, `AAAA`, `CNAME`, `ALIAS`, or `ANAME` records. Do not use a wildcard DNS record.
6. After GitHub's DNS check succeeds, enable **Enforce HTTPS**. DNS and certificate changes can take up to 24 hours.

If the domain changes later, update the custom domain in GitHub Pages, the DNS records, and the canonical/alternate URLs in both HTML files.

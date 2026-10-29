# lancelance.com

![Nuxt](https://img.shields.io/badge/Nuxt.js-%23010113?style=for-the-badge&logo=nuxt)
![Vue](https://img.shields.io/badge/Vue.js-%23191A22?style=for-the-badge&logo=vuedotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%231a202c?style=for-the-badge&logo=tailwind-css)

Personal blog and project website built with Nuxt 4, Vue, and Tailwind CSS. The canonical production URL is [lancelance.com](https://lancelance.com).

## Set up

Use Node.js 22.22.3 from `.node-version` and pnpm 10.27.0 from `package.json`. With Corepack available, install the locked dependencies:

```sh
corepack enable
corepack prepare pnpm@10.27.0 --activate
pnpm install --frozen-lockfile
```

Run `pnpm dev` for local development. The application does not require secrets or a database. Builds access GitHub for repository cards and external font services; repository cards show a fallback if GitHub data is unavailable.

## Check and build

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm check:content
pnpm images:check
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm test:failures
```

Run the build before the browser suite. Playwright serves the generated `dist` directory with `scripts/serve-static.mjs`, so it exercises the static output. `pnpm test:failures` starts an isolated development server and injects upstream errors to check fallback and retry behavior. CI installs Chromium with `pnpm exec playwright install --with-deps chromium`.

When source images or their references change, run `pnpm images:generate`. The script uses Sharp to generate responsive images under `public/img/generated/` and records them in `app/assets/generated-images.json`. Commit the generated files, the manifest, and `scripts/images.integrity.json`. Keep original images for the zoom view. `pnpm images:check` verifies source and output hashes, the recipe, dimensions, and manifest without re-encoding images. This permits verification on different operating systems. Regenerate when the source or recipe changes; their hashes determine rendition URLs. The recipe also records the generator source hash and Sharp version, so generator and encoder upgrades require regeneration.

The `cloudflare-pages-static` Nitro preset writes the static site to `dist`. Server routes under `/api` supply data during development and prerendering. They are not deployed as a public API, and a public `/api` request returning 404 is expected. A failed client payload is a loading error, so retry reloads the static document. Direct requests for missing pages still return 404.

## Deploy and recover

The owner must identify the Cloudflare Pages project and its deployment settings before releasing. Build the intended commit with the locked toolchain and checks above, then use the project’s configured deployment process to publish `dist`. Record the commit and deployment ID with the release. This repository does not establish the owner's account access or a complete deployment workflow.

To recover a previous release, the owner can inspect the Pages deployment history and select the known-good deployment using Cloudflare's rollback controls. Alternatively, check out the known-good commit, install its locked dependencies, rebuild, verify, and deploy its output through the configured process. Confirm the site and its key pages after either procedure. Hosting access and an actual rollback have not been verified here.

## Content guides

- [Projects content](docs/projects-content.md)
- [MDC components](docs/mdc-components-setup.md)

## Credits

- [MonkeyType](https://github.com/monkeytypegame/monkeytype) for the theme picker.

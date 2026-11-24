# lancelance.com

![Vue](https://img.shields.io/badge/Vue%203-%23191A22?style=for-the-badge&logo=vuedotjs)
![Vite](https://img.shields.io/badge/Vite-%23646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%231a202c?style=for-the-badge&logo=tailwind-css)

Personal blog and project website built with raw Vue 3, Vite, Vue Router, and Tailwind CSS v4, statically prerendered for Cloudflare Pages. The canonical production URL is [lancelance.com](https://lancelance.com).

## Set up

Use Node.js 22.22.3 from `.node-version` and pnpm 10.27.0 from `package.json`:

```sh
corepack enable
corepack prepare pnpm@10.27.0 --activate
pnpm install --frozen-lockfile
```

Run `pnpm dev` for local development. The site requires no secrets, database, or runtime server.

## Check and build

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm check:content
pnpm images:check
pnpm build
pnpm test:e2e
```

`pnpm build` compiles the Vue app with Vite, runs an SSR prerender pass (`scripts/prerender.mjs`) to emit static HTML for every route plus `404.html`, `sitemap.xml`, and `robots.txt` into `dist/`, and cleans up the temporary SSR build. Point Cloudflare Pages at `pnpm build` with output directory `dist`.

When source images change, run `pnpm images:generate` to regenerate WebP renditions under `public/img/generated/`, update `src/assets/generated-images.json`, and update `scripts/images.integrity.json`. To refresh cached GitHub star/fork counts for `<GithubRepoCard>`, run `pnpm repos:refresh`.

## Content guide

- [Projects & blog content guide](docs/projects-content.md)

## Credits

- [MonkeyType](https://github.com/monkeytypegame/monkeytype) for the theme picker.

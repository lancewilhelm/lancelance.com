# MDC components

Markdown in `content/blog/` and `content/projects/` uses `@nuxtjs/mdc`. Custom components live in `app/components/mdc/` and use kebab-case names in Markdown. The prose mappings for headings, code blocks, and tables are in `nuxt.config.ts`.

## Images

`BlogImage.vue` accepts `imagePath`, `alt`, `caption`, `width`, `height`, `link`, and `eager`. Use a descriptive `alt` for each image. Set `eager: true` for an image expected above the fold. Without a link, the image opens a native zoom dialog with a close button. With a link, the image links to that destination instead.

This example is from [Retroboard](../content/projects/retroboard.md):

```md
::blog-image
---

eager: true
imagePath: /img/retroboard/IMG_0982_crop.jpg
alt: Retroboard LED matrix displaying a clock
caption: Retroboard snapshot.
width: 640px
---

::
```

The component uses the caption or `Article image` when `alt` is absent, but authors should supply image-specific text. The responsive image generator and original-image requirements are in the [README](../README.md).

## Repository cards

`GithubRepoCard.vue` takes a GitHub repository in `owner/name` form. For example:

```md
::github-repo-card
---

repo: lancewilhelm/retroboard
---

::
```

The card fetches repository details and retains a repository link and an unavailable message if the fetch fails.

## Prose and verification

`ProseH2.vue`, `ProseH3.vue`, and `ProseH4.vue` provide heading link copy buttons and announce copy status. `ProsePre.vue` and `ProseTable.vue` render code blocks and tables. The image zoom and heading controls use buttons that can receive keyboard focus. These implementation details do not establish full accessibility compliance.

Run `pnpm check:content`, `pnpm typecheck`, and `pnpm build` after content or component changes. Run `pnpm test:e2e` after the build to exercise the generated site. Review affected pages in a browser, including image loading, zoom, keyboard controls, and repository-card fallback where relevant.

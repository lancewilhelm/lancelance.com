# Projects & Blog Content Guide

All project pages and blog posts are plain Vue 3 single-file components (no Markdown parser or Nuxt layer).

## Add a project

1. Create a Vue component under `src/content/projects/` (for example, `MyProject.vue`).
   - Use the shared article components in `src/components/`:
     - `<ProseHeading :level="2" id="section-id">Section</ProseHeading>`
     - `<BlogImage eager image-path="/img/my-project/shot.png" alt="..." caption="..." width="700px" />`
     - `<CodeBlock language="ts" filename="example.ts" :code="snippet" />`
     - `<ProseTable>...</ProseTable>`
     - `<GithubRepoCard repo="lancewilhelm/my-repo" />`
     - `<MathExpr :expr="formula" :display="true" />`
2. Register the project in `src/content/projects/index.ts` with `slug`, `path`, `title`, `description`, `image`, `category` (`work`, `personal`, or `academic`), `order`, `tags`, and `component`.
3. Put source images under `public/img/<slug>/` with exact matching case, then run:
   - `pnpm images:generate`
   - `pnpm check:content`
   - `pnpm repos:refresh` (if you added a new `<GithubRepoCard>` repo)

Projects are grouped in the order **work**, **personal**, **academic**. Empty categories are hidden. Within a category, lower `order` values come first, followed by a case-insensitive title sort.

## Add a blog post

1. Create a Vue component under `src/content/blog/`.
2. Register it in `src/content/blog/index.ts` with `slug`, `path`, `title`, `description`, `date`, `tags`, and `component`.
3. Run `pnpm images:generate` if you added images, then verify with `pnpm check:content && pnpm build`.

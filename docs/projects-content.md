# Projects content guide

Project entries are Markdown files in `content/projects/`. Their filenames determine their URLs. For example, `retroboard.md` produces `/projects/retroboard`. An optional `YYYY-MM-DD-` prefix is removed when deriving the slug. Slugs must be unique.

## Add a project

1. Add a Markdown file in `content/projects/` with YAML front matter and a body.
2. Set `title`, `description`, and `image` to nonempty strings. The image is a path under `public/` and its case must match the file.
3. Set `category` to `work`, `academic`, or `personal`. Missing or unrecognized categories default to `personal`.
4. Optionally set `order` to a number or numeric string and `tags` to an array of strings. Missing or invalid order defaults to `1000` in the parser. The content check rejects invalid order values.
5. Run `pnpm check:content`, `pnpm images:generate` if image references changed, and the checks in the [README](../README.md). Review the index and detail page with `pnpm dev`.

Projects are grouped in the order work, academic, personal. Empty categories are hidden. Within a category, lower `order` values come first, followed by a case-insensitive title sort.

Use these existing entries as examples:

- [Retroboard](../content/projects/retroboard.md) uses the personal category and image and repository components.
- [Hateful Memes](../content/projects/hateful-memes.md) is an academic project.
- [Horizon Extended](../content/projects/horizon-extended.md) is another personal project.

The [MDC component guide](mdc-components-setup.md) describes images and repository cards. Write descriptive image `alt` text and mark an above-the-fold image with `eager: true` when appropriate.

## Data and static output

During development and prerendering, `/api/projects/list` returns previews. The endpoint accepts `category=work`, `category=academic`, `category=personal`, or `grouped=true`. `/api/projects/:slug` returns a project with its Markdown body. Previews include the title, description, image, order, tags, category, slug, and path.

The production build is static. The generated project pages contain the data they need, but the API handlers are not deployed as public runtime endpoints. A public API request returning 404 is expected.

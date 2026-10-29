# lancelance.com repository audit

Audited on October 28, 2026, America/New_York. Source baseline `ac02d9d54e53066c7ba787e5029ed7fa1827e5a0`. The working tree was clean before the audit. This report assesses the whole current repository. No application fixes, dependency updates, deployment changes, or commits were made.

The site builds and its main reading flows work. The most useful next work is to restore type checking, correct production canonical and social URLs, update affected dependencies, and repair accessibility and recovery defects. The public Retroboard image is broken. Both modal components leak event listeners. Invalid saved configuration prevents even the default theme from loading.

No remotely exploitable application vulnerability was established. Dependency advisory matches require follow-up, with the static production boundary taken into account. This is an audit with explicit gaps, not a security certification.

## Evidence and verification

Labels used throughout this report are **S**, static source review; **A**, automated command or reproduction; **B**, Chromium against a fresh local production build; and **L**, direct read-only requests to the public site. B is runtime verification, but it is not verification of the deployed build. A source-based conditional risk is explicitly labeled as such.

Saved check logs are [lint.log](lint.log), [typecheck.log](typecheck.log), and [build.log](build.log). The complete tracked inventory and per-file review depth are in [coverage.tsv](coverage.tsv). Reproduction observations are saved in [evidence.json](evidence.json). The dependency matches are in [dependency-advisories.json](dependency-advisories.json).

| Check | Result | Verification limit |
| --- | --- | --- |
| `pnpm lint` in the original checkout | Passed, exit 0 | Lint does not establish accessibility, runtime correctness, or type safety. |
| `pnpm typecheck` in the original checkout | Failed, exit 1 | Four unresolved `@vueuse/core` imports and a Vite plugin type incompatibility. Nuxt tried to provision unpinned `vue-tsc@3.3.13`. |
| `pnpm build` in an isolated source copy | Passed, exit 0 | Reused the existing installed dependency tree through a symlink. This was not a clean install or a restore drill. |
| Fresh prerender | 34 generated routes, including 16 actual page routes | Payload routes are included in 34. All 6 blog details and 6 project details were present. |
| Chromium, all 16 generated page routes | All returned 200, with no uncaught page errors during the route sweep | One image failed. Console warnings, expected 404s, and a later deliberate storage fault were recorded separately. |
| Tag filter | 6 posts, then 1 for Data Science, then 6 after reset | One representative tag, not every possible query combination. |
| Theme selection and reload | Dracula selected and persisted | One alternate theme exercised. All 176 advertised themes have matching CSS filenames. |
| Image zoom | Open and Escape close worked | Repeated opening revealed listener accumulation. |
| Code copy | Copied `npm create vue@latest` successfully | Mouse and allowed clipboard permission only. Clipboard denial handling was not exercised. |
| Client navigation | Home to projects to Retroboard worked | Representative navigation, not every possible page-to-page transition. |
| Mobile checks | 375px layout checks on home, blog list, project list, one article, and Retroboard found no horizontal document overflow | One causal-attention viewport screenshot inspected. Not a full visual, zoom, touch, or browser compatibility audit. |
| Actual h3 projects handler | Valid category returned 200; repeated category returned 500 | Executed the real handler and parser after TypeScript transpilation. This tests development/server behavior, not Cloudflare static production. |
| Public HTTP checks | Home, blog list, Retroboard returned 200; lowercase simulator image returned 404 and uppercase returned 200 | These are live responses. The deployed commit could not be established. |
| Dependency audit | 178 advisory/version entries, 141 unique advisory URLs, across 47 package names | Counts are package matches, not 178 distinct exploitable site defects. No exploit attempts were made. |
| Narrow tracked-secret scan | No matches for private-key blocks, GitHub token shapes, AWS access-key IDs, or long OpenAI-style secret keys | Current tracked files only, with a size bound. No full-history or credential-store scan. |

The local build lived at `/tmp/lancelance-audit.ZmqlOw/site`. Raw logs and the audit-only browser scripts remain under `/tmp/lancelance-audit.ZmqlOw`. These temporary files may disappear. The durable JSON observations and inventory accompany this report. Two initial browser-script selectors failed and were corrected; their incomplete attempts are not counted as passing flows. The installed Playwright package expected a newer browser than was available, so the checks explicitly used the existing Chromium executable. This is an additional browser-tool compatibility limit.

A repeat of lint and typecheck in the isolated copy encountered the desktop package runner's automatic install warning because `node_modules` was a symlink. The underlying commands still ran. Lint passed and typecheck reproduced the same diagnostics. That symlink warning is an audit-environment issue, not a repository defect. Node reported `v22.22.3` and the checkout's pnpm reported `10.27.0`; the desktop escalated runner also supplied its own package-command wrapper.

## Coverage map

| Area | Inspected | Exercised | Remains unverified |
| --- | --- | --- | --- |
| `app/pages`, layouts, app entry, error page | Every source file | All generated routes; representative navigation; unknown-page display | Safari, Firefox, real mobile devices, browser history permutations, offline recovery |
| Components and MDC rendering | Every component, including code, headings, tables, images, GitHub cards | All articles rendered; code copied; zoom and theme dialogs opened repeatedly; heading control DOM inspected | Assistive technology, full keyboard walkthrough, clipboard denial, every heading control and table interaction |
| `app/stores`, `utils`, `public/js` | All source; storage and theme flow traced | Valid persistence, malformed JSON, and JSON `null` | Storage access denial and quota failure were reviewed statically, not induced |
| `server/api`, `server/utils`, `shared` | Every source and type file | Fresh prerender, actual project parser, repeated-query reproduction, date expressions | A deployed server mode; adversarial input fuzzing; future content mutations |
| `content` | All 12 frontmatter blocks, slug and asset references, Markdown components | All 12 details rendered | Editorial accuracy, historical tutorial code execution, external-link availability beyond sampled dependencies |
| `public/css/themes`, theme registry | All names matched; CSS searched for external imports and URL sinks; default Paper colors checked | Paper and Dracula; default text contrast computed | Individual visual and contrast review of all 176 themes. Chaos Theory has an external Imgur background image; its availability was not tested. |
| Other public assets | Complete tracked inventory; linked images loaded in the page sweep; file-size inspection | Broken image confirmed locally and publicly | Full visual review of every image, PDF content/accessibility, unused assets, manifest installation |
| Build, dependencies, configuration | All tracked configuration, package manifest, lockfile, selected installed Nuxt/Nitro internals | Lint, typecheck, build, live advisory database | Fresh dependency installation, reproducible byte-for-byte builds, all advisory call paths |
| Security and permissions | Routes, filesystem reads, raw-HTML sink, storage, external URLs, secret patterns, public response headers | Read-only live responses and dependency inventory | Cloudflare account permissions, branch protection, deployment credentials, DNS settings, infrastructure logs, full Git history |
| Data integrity and recovery | Filename-derived slugs, frontmatter, missing-directory behavior, theme recovery, source/artifact boundary | Current content parsed and built; date and order coercion reproduced | Real rollback, rebuilding on another machine, remote backup restoration |
| Tests, CI, deployment docs | All tracked files and both guides | Existing checks executed | External CI/platform configuration. No tracked CI workflow or test suite was found. |

The inventory contains 319 tracked files at the audited commit. The per-file map distinguishes source review, content/reference review, automated theme checks, and binary inventory. It does not claim that every binary or every stylesheet received manual visual inspection.

## Architecture and trust boundaries

This is a Nuxt SSR application configured to produce a static Cloudflare Pages site. Repository Markdown is its content source. At generation time, server handlers supply lists and details, and Nuxt renders linked pages and payloads. See [nuxt.config.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/nuxt.config.ts#L23).

Blog and project previews contain frontmatter plus a filename-derived slug and route. Detail records add Markdown content. Project categories normalize to `work`, `academic`, or `personal`, with invalid values defaulting to `personal`, as documented. See [blog.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/server/utils/blog.ts#L12) and [projects.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/server/utils/projects.ts#L24).

The content utilities synchronously enumerate trusted files and parse frontmatter with gray-matter. API handlers adapt those records for `useAsyncData` and `$fetch`. Detail pages pass Markdown to MDC. The static build captures the results, so public runtime APIs are a separate deployment capability. The early theme script reads browser storage and inserts a CSS link. The footer opens the picker, which changes and persists that selection.

`content/` owns authored content, `server/utils/` parses it, `server/api/` adapts it, `app/pages/` renders it, and `app/components/mdc/` customizes Markdown rendering. `public/css/themes/` owns selectable stylesheets. GitHub cards add a third-party fetch during rendering.

No database, account system, privileged write API, or user-upload path was found. The missing authentication layer is therefore not a defect. Detail lookups match slugs against enumerated filenames before opening a file; a request cannot directly choose an arbitrary filesystem path through these functions. The `v-html` use in `ProsePre.vue` receives highlight.js output for repository-controlled code. Neither it nor MDC was established as a public stored-XSS path. This boundary must be reassessed if untrusted authors or a CMS are introduced.

## Prioritized findings

P1 means the next maintenance work. P2 means a material defect or improvement to schedule soon. P3 means a bounded follow-up with less immediate impact. Priority is the proposed work order, not an assertion of CVSS severity.

### F01. P1. The advertised typecheck fails

**Confirmed, A. High confidence in the observed environment.** [ProseH2.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/ProseH2.vue#L3), [ProseH3.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/ProseH3.vue#L3), [ProseH4.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/ProseH4.vue#L3), and [ProsePre.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/ProsePre.vue#L3) import `@vueuse/core`, which is not declared directly in [package.json](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/package.json#L14). All four produce TS2307. [nuxt.config.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/nuxt.config.ts#L21) also produces TS2322 for incompatible Vite plugin types. `vue-tsc` is absent from devDependencies, and the first check attempted to provision a current version.

Maintainers cannot use typecheck as a green gate, and a successful build currently hides this failure. The smallest useful remedy is to declare or remove the direct VueUse imports consistently, pin the type checker, and resolve the incompatible Vite type resolution. Do not silence the error with a cast. Verify `pnpm typecheck` after a clean frozen-lockfile install, then rebuild. The exact clean-install cause of the Vite type split remains unverified.

### F02. P1. Production canonical and social URLs identify other hosts

**Confirmed, S/B/L. High confidence in emitted values.** [Blog detail](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/blog/%5Btitle%5D.vue#L46) and [project detail](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/projects/%5Bslug%5D.vue#L39) hard-code `https://lancelance.dev`. The site has no explicit production site URL in [nuxt.config.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/nuxt.config.ts#L5). Live home and blog responses advertise canonical URLs under `https://44d0a955.lancelance-com.pages.dev`. Retroboard advertises that preview host as canonical and `lancelance.dev` as `og:url`. The fresh local artifact emits relative canonical values and the same hard-coded social host.

Search engines receive the wrong preferred host, and shared page metadata is inconsistent. Search ranking or indexing loss was not measured. Define the intended production origin once as `https://lancelance.com`, derive detail metadata from it, and preserve deliberate preview indexing policy. Rebuild and inspect HTML from both production and a preview. Also verify sitemap generation in that unit; the fresh artifact has no sitemap, and both `/sitemap.xml` and `/sitemap_index.xml` returned 404 publicly.

### F03. P1. The locked application toolchain contains known affected dependency versions

**Confirmed inventory, A. Exploitability unverified. High confidence in version matches.** [package.json](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/package.json#L24) selects Nuxt 4.3.1; [pnpm-lock.yaml](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/pnpm-lock.yaml#L1) locks its application and build dependencies. The advisory response contains 178 advisory/version entries, including 7 critical, 90 high, 65 moderate, and 16 low entries. Deduplication leaves 141 advisory URLs across 47 package names.

Examples include `seroval@1.5.0`, `@nuxt/devtools@3.2.1`, `simple-git@3.31.1`, `tar@7.5.9`, `vite@7.3.1`, and `@vue/server-renderer@3.5.28`. These are not all deployed server packages. Devtools is explicitly disabled, content is trusted, and production is static. No critical public exploit path was demonstrated. The audit response's production/dev counters do not describe runtime reachability because Nuxt brings build tooling through application dependencies.

The useful remedy is a reviewed update of Nuxt and its supported companion modules, followed by focused transitive updates where necessary. Do not apply unreviewed `audit --fix --force` overrides. Re-run advisory triage, typecheck, build, and the reading flows after each update unit. The [Seroval maintainer advisory](https://github.com/lxsmnsyc/seroval/security/advisories/GHSA-p6vx-979v-rg4c) describes the plugin-capable deserialization condition. The [Nuxt maintainer advisory](https://github.com/nuxt/nuxt/security/advisories/GHSA-vjh5-4x84-xrqp) identifies a route-rule fix in 4.6.2; the protected server-route scenario is not present in this static site. The complete captured matches accompany this report.

### F04. P2. Retroboard's simulator image returns 404

**Confirmed, S/B/L. High confidence.** [retroboard.md](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/content/projects/retroboard.md#L39) requests `/img/retroboard/sim.jpg`; the tracked file is [sim.JPG](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/public/img/retroboard/sim.JPG). The exact-case local server recorded a broken image. Public lowercase returned 404 and uppercase returned 200.

Readers miss the simulator screenshot. Change the content reference to match the existing filename. Verify the image's HTTP status and `naturalWidth` on the project page. Add exact-case asset-reference validation to the content smoke check.

### F05. P2. Theme selection is unavailable to keyboard users, and footer actions overlap

**Confirmed, S/B. High confidence.** [AppFooter.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/AppFooter.vue#L9) uses a click-only `div` for the palette and places the GitHub link inside it. The GitHub link has no accessible name. Preventing its navigation during the browser check still opened the theme picker, proving the event bubbles to the palette action. [ThemePicker.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/ThemePicker.vue#L49) renders every selection as a click-only `div`. The opened picker contained zero native or explicitly focusable controls and no dialog role.

Keyboard users cannot choose a theme. Screen-reader users also lack named controls and modal focus behavior. Use separate named footer button and link, native selection buttons, a named dialog, a close control, focus containment, and focus return. Keep the current themes and visual layout. Verify the complete open/select/close flow using only Tab, Enter, and Escape, then confirm GitHub no longer opens the picker.

### F06. P2. Article image and copy controls lack accessible operation or names

**Confirmed, S/B. High confidence.** [BlogImage.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/BlogImage.vue#L39) and [ImageZoom.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/ImageZoom.vue#L44) omit image alternatives. Unlinked images open zoom only through a click handler. Project thumbnails also omit `alt` in [projects/index.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/projects/index.vue#L70). Images used as PDF links yield unnamed links; the fresh build identified the two PDF links in Hateful Memes and House Numbers.

[ProsePre.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/ProsePre.vue#L64) makes code copy a click-only `div`. [ProseH2.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/ProseH2.vue#L38), H3, and H4 reveal a click-only icon on hover; the inspected heading wrapper had no focusable control. Their clipboard action claims success without awaiting completion.

Readers using a keyboard or screen reader lose image information, zoom, or copy functions. Add content-specific alternative text, an accessible zoom button/dialog, named PDF links, and native copy buttons visible on focus. Await clipboard results and show failure when appropriate. Decorative thumbnails may use `alt=""` when the adjacent title already names the same link. Verify these as three small units, image/link alternatives, zoom operation, and copy operation.

### F07. P2. Default secondary text fails minimum contrast

**Confirmed, S/A/B. High confidence.** [paper.css](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/public/css/themes/paper.css#L5) sets `--sub-color` to `#b2b2b2` on `#eeeeee`. Publication dates use it in [BlogCard.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/BlogCard.vue#L23) and [blog detail](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/blog/%5Btitle%5D.vue#L63). Chromium reported those colors at 18.6667px and weight 400. Their calculated contrast is 1.8275:1, below the 4.5:1 requirement for normal text in [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Project descriptions use the same token.

Dates and descriptions are difficult to read for people with low vision. Use a suitable text color for meaningful secondary text while retaining the palette for borders and decoration, or adjust the default theme's secondary text token. Verify computed colors and contrast in Paper first, then audit other offered themes separately. This is a measurable accessibility issue, not a preference for a different palette.

### F08. P2. Reopening either dialog accumulates document listeners

**Confirmed, S/B. High confidence.** [ThemePicker.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/ThemePicker.vue#L12) and [ImageZoom.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/ImageZoom.vue#L12) register `mousedown` and `keydown` listeners during setup and never remove them. Their parents mount them with `v-if`. Browser instrumentation showed each component left three extra listeners of each type after three open/close cycles.

Long sessions retain stale component closures and execute old close callbacks. Register named handlers on mount and remove them on unmount, or use a lifecycle-aware event utility. Verify listener counts return to baseline after repeated opening, closing, and page navigation. Escape must continue to close the active dialog once.

### F09. P2. Invalid saved configuration prevents default theme recovery

**Confirmed, S/B. High confidence.** [theme-loader.js](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/public/js/theme-loader.js#L50) parses storage before inserting any stylesheet. Both malformed JSON and JSON `null` prevented `#currentTheme` from being created in Chromium. Malformed JSON also left `--bg-color` unset. [config.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/stores/config.ts#L13) reads storage outside its catch, accepts parsed values through a cast, and never repairs malformed saved JSON. `setTheme` repeats parsing before applying CSS.

A damaged preference can leave the site without its theme across reloads and interfere with recovery through the picker. Validate the stored object and theme name, fall back to Paper regardless of storage failures, and separate applying CSS from persisting preferences. Repair invalid storage when storage permits. Verify absent, valid, malformed, `null`, and unknown-theme values, plus denied storage. Denied storage and unknown-theme runtime cases were not induced during this audit.

### F10. P2. Publication dates change with the reader's timezone

**Confirmed, S/A/B. High confidence.** [rag-bot.md](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/content/blog/2024-11-14-rag-bot.md#L3) parses to midnight UTC. [BlogCard.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/BlogCard.vue#L26) and [blog detail](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/blog/%5Btitle%5D.vue#L65) format without an explicit timezone. Chromium displayed 14 November 2024 in UTC and 13 November 2024 in America/New_York from the same generated site.

Readers see inconsistent publication days. Server/client timezone differences can also affect hydration, but a hydration warning was not established. If publication is a calendar date, model and render it as such; an explicit UTC formatter is the smallest bounded repair for the current data. Verify list and detail dates in both timezones. Do not automatically replace dates from filenames; some current filename dates differ from frontmatter.

### F11. P2. Pages eagerly serve large original images without responsive alternatives

**Confirmed opportunity, S/A/B. High confidence in bytes and markup; no latency claim.** [BlogImage.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/BlogImage.vue#L40) and [project thumbnails](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/projects/index.vue#L70) use original files without `srcset`, intrinsic dimensions, or lazy loading. [Retroboard frontmatter](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/content/projects/retroboard.md#L4) uses a 4,366,800-byte image even for its 300px card. The second article image is 3,507,788 bytes. A local image sweep loaded the displayed originals; the sizes are file bytes, not a measured load-time regression.

Mobile readers transfer and decode more image data than the display needs. Generate appropriately sized card and article renditions, retain originals for zoom, add intrinsic dimensions, and lazy-load images below the fold. Keep the initial prominent image eager. Verify downloaded resource choices at narrow and wide viewports, image clarity, and zoom. Do not promise a speedup until load behavior is measured on a realistic network.

### F12. P2. Code articles download the full highlight.js language bundle

**Confirmed opportunity, S/A/B. High confidence in payload; performance impact not timed.** [ProsePre.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/ProsePre.vue#L2) imports the full `highlight.js` entry. The corresponding fresh client chunk is 970,857 bytes, or 312,648 bytes with local gzip. Chromium's resource entries confirmed the 970,857 decoded bytes on Vue Chatbot Part 1. This is not the home-page entry chunk.

Readers of code articles download and parse a large grammar bundle. Use highlight.js core with the languages present in current content, plus a deliberate plain-text or bounded fallback for unknown labels, or precompute highlighting during generation. Retain current supported language behavior. Verify all current code fences, copied text, and the resulting loaded bundle. The gzip number is a reproducible local encoding size, not observed Cloudflare wire size or measured latency.

### F13. P2. No tracked automated test or CI gate protects these flows

**Confirmed repository gap, S. High confidence within the tracked tree.** [package.json](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/package.json#L5) has lint, typecheck, and build scripts, but no test script. The complete tracked inventory contains no test suite or CI workflow. External platform checks remain unverified. Current lint passed despite the defects above, and build succeeded despite failed typecheck.

Maintainers can publish regressions without a repeatable gate. Start with a small CI workflow using a pinned toolchain and frozen installation. Run lint, typecheck, build, exact-case asset validation, emitted metadata checks, and a short static-output browser smoke test. Add behavioral regressions for dates, storage recovery, dialogs, and repeated queries alongside their fixes. Verify the gate catches the current known failures before making it required. Do not add tests merely to mirror helper implementations.

### F14. P3. Main content and project titles lack document semantics

**Confirmed, S/B. High confidence.** [blog layout](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/layouts/blog.vue#L6), [bloglist layout](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/layouts/bloglist.vue#L6), and [default layout](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/layouts/default.vue#L3) use generic containers for primary content. None of the 16 inspected pages had a main landmark. [Project detail](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/projects/%5Bslug%5D.vue#L55) renders its title in a `div`; none of the six project details had an H1. Project section titles are also generic `div`s.

Assistive-technology users cannot navigate by the expected content landmark and project heading hierarchy. Use `main` for primary content and semantic headings that preserve existing classes. Consider a skip link in the same navigation pass. Verify the accessibility tree, one main landmark, meaningful heading order, and unchanged visual layout. A missing H1 alone is not treated here as proof of a particular WCAG failure.

### F15. P3. Project query handling throws on repeated parameters

**Confirmed in server mode, A. High confidence; not a deployed-site defect.** [projects/list.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/server/api/projects/list.ts#L13) casts the query value to string before `.toLowerCase()`. The real h3 handler returned 200 for `?category=academic`, but 500 for `?category=work&category=academic`. It also returned 500 with `grouped=true` because the failing normalization occurs first.

Development clients or a future server deployment receive an internal error for an ordinary query shape. Reject arrays with 400 or define which value wins, and evaluate the grouped branch before irrelevant category parsing. Verify repeated, empty, mixed-case, and unsupported categories. The public grouped API returned 404 as expected for the current static deployment, so this is lower priority than reader-visible defects.

### F16. P3. Null and empty project order values sort first instead of using the documented fallback

**Confirmed coercion defect, S/A. High confidence; no current content triggers it.** [projects.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/server/utils/projects.ts#L57) and its full-record parser at line 79 accept `Number(null)` and `Number('')` as zero. [The schema guide](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/docs/projects-content.md#L41) promises 1000 for missing or invalid order. The read-only expression check reproduced zero for both values; the current six projects have numeric orders.

An author can accidentally move a new project ahead of intentionally ordered projects. Validate absence and value type before conversion, using the same normalization for previews and details. Verify missing, null, empty, numeric, and invalid input while preserving current ordering and documented category fallback. Broader schema and duplicate-slug checks belong in the content validation gate; there was no current slug collision.

### F17. P3. Project types are duplicated across shared and server modules

**Confirmed maintenance issue, S/A. High confidence.** [shared/types/projects.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/shared/types/projects.ts#L6) and [server/utils/projects.ts](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/server/utils/projects.ts#L5) independently declare `ProjectCategory`, `Project`, and `ProjectPreview`. Build and typecheck both warned that the shared auto-imported types were ignored in favor of server declarations.

Maintainers must keep two contracts synchronized, and warnings obscure useful diagnostics. Import the shared types into the parser and remove the duplicate declarations. Keep parsing behavior unchanged. Verify the duplicate warnings disappear, typecheck passes after F01, and current preview/detail records remain identical. A new repository layer or generic content framework is not justified by this issue.

### F18. P3. Setup, deployment, and recovery depend on undocumented knowledge

**Confirmed documentation and configuration gap, S. High confidence; actual recovery reliability unverified.** [README.md](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/README.md#L1) describes the site and credits its theme source but omits installation, supported runtimes, build output, deployment, and rollback. [package.json](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/package.json#L1) pins neither a package-manager version nor a Node range. No tracked deployment workflow or Wrangler configuration establishes the complete release procedure.

A maintainer rebuilding after machine loss cannot determine the intended toolchain, required build environment, published commit, or rollback procedure from the repository. Record the tested versions, frozen install, checks, `dist` output, production site URL, deployment ownership, and source/artifact rollback steps. Pin the chosen toolchain after verification. Prove this with a fresh clone and a staging build, then inspect the hosting deployment history before documenting a real rollback. Do not add database backup machinery to a site without a database.

### F19. P3. Contributor guides contain stale examples and claims

**Confirmed, S/B/L. High confidence.** [projects-content.md](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/docs/projects-content.md#L141) describes query-dependent APIs without explaining that they run during development and generation. The public grouped endpoint returned 404, while generated project pages worked. [Its example-file section](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/docs/projects-content.md#L176) names three files absent from the tracked tree. [mdc-components-setup.md](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/docs/mdc-components-setup.md#L85) calls heading copying fully accessible, while the live component uses a hover-only, unfocusable icon.

Contributors follow nonexistent templates or infer runtime and accessibility guarantees the implementation does not provide. Replace invented examples with current content, document the static boundary, and update accessibility claims after the related fixes are verified. Keep the migration history only where it still explains a present requirement. Verify every documented path and command against a fresh checkout.

## Conditional risks requiring verification

These are not additional confirmed production defects. They are separate investigation items, with bounded next steps.

| ID | Evidence, impact, and confidence | Smallest verification and contingent remedy |
| --- | --- | --- |
| H01. P3. Third-party card failure becomes a silent static omission | [GithubRepoCard.vue](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/components/mdc/GithubRepoCard.vue#L25) fetches GitHub while rendering and hides all output when data is absent. S confirms the branch. A transient error could remove useful repository links until a later build. Medium confidence in operational impact; no GitHub outage was induced. | Generate a representative page with GitHub returning 403 and 503. If the omission occurs, retain a stable repository link and a visible fallback, or fail the build when the card is required. Avoid introducing a general caching service for six cards. |
| H02. P3. Failed content requests look like empty collections or 404s | [Blog list](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/blog/index.vue#L16) and [project list](https://github.com/lancewilhelm/lancelance.com/blob/ac02d9d54e53066c7ba787e5029ed7fa1827e5a0/app/pages/projects/index.vue#L13) ignore `useAsyncData` errors. Detail pages convert absent data to 404 regardless of error cause. S confirms this handling. Medium confidence in reader impact under static payload-fetch failures; normal flows passed. | Block or corrupt a page payload during client navigation and induce a server 500 in development. If confirmed, distinguish transport/server errors from a real not-found result and provide a bounded retry. Preserve the working static payload path. |

## Security and recovery limits

The public response samples included `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`. They did not include CSP or frame restrictions. With trusted static content and no privileged user actions, their absence is recorded as defense-in-depth follow-up, not a demonstrated exploit. A future policy should first be tested in report-only mode against Nuxt's generated scripts, fonts, icons, and article embeds. No edge settings were changed.

Repository Markdown and public assets are the durable data. Generated HTML is a rebuildable artifact. Current parsing accepts loosely typed frontmatter and silently treats a missing content directory as an empty collection. The successful current build establishes that the present content was included, not that a damaged or incorrectly packaged checkout will fail safely. A small build-time content check should assert expected nonempty collections, unique slugs, field shapes, valid dates, and exact-case local assets. Preserve documented permissive behavior, such as default project category, unless the author chooses otherwise.

Hosting ownership, deployment tokens, production branch permissions, published commit identity, backups, and a real restore/rollback were not verified. No sensitive credential values or ignored Wrangler state were inspected. The dependency and narrow secret scans do not replace those checks.

## Style and optional cleanup

These are separate from the actionable defects. There is no evidence supporting a redesign, framework replacement, or generalized content repository abstraction. Preserve the present typography, theme choice, reading layout, and static publishing model.

Dead commented transitions in `app/app.vue`, an old commented zoom implementation, narration comments, and project comments memorializing removed dates can be removed opportunistically. No source `eslint-disable`, `@ts-ignore`, or `@ts-expect-error` suppression was found in the reviewed application scope. The duplicate `blog` and `bloglist` layouts and older root theme utilities may be cleanup candidates after their call sites and generation behavior are checked. A placeholder unlinked manifest is not treated as a current install defect. The spelling of the About-page biography is editorial, not an application defect.

## Deduplicated backlog and verification sequence

The findings above are the backlog. Do not open separate issues for every dependency advisory, every missing `alt`, or each leaking event type. Keep F03 as a version-update program, F06 as three small accessibility units, and F08 as one shared lifecycle defect with two callers.

| Order | Work unit | Finding | Independent exit check |
| --- | --- | --- | --- |
| 1 | Declare required VueUse and checker dependencies; resolve Vite type incompatibility | F01 | Clean frozen install, green typecheck and build |
| 2 | Add a minimal CI baseline using the now-working checks | F13 | Demonstrate a failing known fixture or smoke assertion, then a green normal build |
| 3 | Establish the production origin and derive canonical/social metadata | F02 | Production HTML contains only the intended canonical origin; preview policy remains deliberate; sitemap request succeeds if enabled |
| 4 | Fix the single simulator asset reference | F04 | Public image returns 200 after an authorized deployment; local image has positive naturalWidth |
| 5 | Update Nuxt and supported modules in a focused unit, then remaining affected transitive groups separately | F03 | Re-run advisory triage, typecheck, build, and all reading smoke flows for each unit |
| 6 | Repair stored-config recovery | F09 | Every tested storage shape loads a default or valid theme; normal selection still persists |
| 7 | Remove picker and zoom listener accumulation | F08 | Repeated mount/unmount returns event-handler counts to baseline |
| 8 | Separate footer controls, then make the picker operable by keyboard | F05 | Named controls, Tab/Enter/Escape flow, focus return, GitHub independence |
| 9 | Add image alternatives and named PDF links; make zoom accessible; make copy buttons accessible as separate units | F06 | Accessibility-tree checks and keyboard operation for each unit; copied text remains exact |
| 10 | Repair meaningful secondary-text contrast in Paper | F07 | Computed normal-text contrast at least 4.5:1; decorative colors and layout preserved |
| 11 | Make publication dates stable | F10 | List and detail dates agree in UTC and New York |
| 12 | Add main landmarks and semantic project headings | F14 | One main landmark, useful heading hierarchy, visual comparison unchanged |
| 13 | Deliver responsive image renditions, then bound syntax-highlighter languages in separate units | F11, F12 | Correct assets and code output; smaller loaded bytes; no speed claim without a real performance baseline |
| 14 | Normalize repeated API query shapes and invalid order values as separate changes | F15, F16 | Real-handler query responses are controlled; parser fixtures preserve all current project ordering |
| 15 | Make shared project types authoritative | F17 | No duplicate import warnings; unchanged records and routes |
| 16 | Document setup/deployment/recovery, then repair contributor guides | F18, F19 | A second-machine or fresh-clone rebuild follows the instructions; every guide path exists |
| 17 | Reproduce third-party and payload failure cases before deciding their fixes | H01, H02 | Explicit failure-injection result, followed by a minimal fallback only if needed |

Each unit can be reviewed and verified independently. Changes involving deployment need their normal release review after the code and artifact checks. This audit stops at the report; it authorizes no deployment and implements none of the backlog.

The Prove It Works principle changed the review from source inspection alone to a fresh build, browser reproductions, and public HTTP checks. Model the Domain and Type System Discipline informed the bounded calendar-date and configuration-validation remedies. Minimize Reader Load kept the type-contract recommendation small. Sequence Work into Verifiable Units shaped the backlog into separately checkable changes. Explain the Number limited performance claims to observed payload bytes rather than inferred speedups.

# Projects Content Guide

This document explains how to add “Projects” content, how it’s parsed, and how it is rendered in the Projects section of the site.

The Projects page groups entries by category into three sections:
- Work Projects
- Academic Projects
- Personal Projects

Each project is a markdown file stored in `content/projects/` with YAML front matter.

---

## Directory and file naming

- Location: `content/projects/`
- File extension: `.md`
- Filename: either a bare slug or a date-prefixed slug
  - Recommended: `YYYY-MM-DD-<slug>.md` (example: `2024-05-10-analytics-dashboard.md`)
  - Allowed: `<slug>.md` (example: `analytics-dashboard.md`)

The slug is derived from the filename by:
- Removing an optional `YYYY-MM-DD-` prefix
- Removing the `.md` extension

Example:
- `2024-05-10-analytics-dashboard.md` → slug: `analytics-dashboard`
- `cli-notes-tool.md` → slug: `cli-notes-tool`

The URL to the project page will be:
- `/projects/<slug>`

---

## Front matter schema

Each project requires front matter with the following fields:

- title: string (required)
- description: string (required)
- order: number (lower number = higher priority; optional, defaults to 1000 if missing/invalid)
- category: one of `work`, `academic`, `personal`
  - If missing or invalid, it will default to `personal`
- tags: string[] (optional)

Example:
```yaml
---
title: "Analytics Dashboard"
description: "A real-time analytics dashboard for monitoring application metrics and business KPIs."
order: 1
category: work
tags:
  - analytics
  - dashboard
  - vue
  - typescript
  - tailwind
---
```

Below the front matter, write your project content in Markdown. Content supports MDC components (see “Using MDC components” below).

---

## Category taxonomy

- work: Projects built in a professional capacity (client work, employment, collaborations with companies).
- academic: Projects related to research, theses, coursework, publications.
- personal: Side projects, experiments, tools, and hobby work.

The Projects index page renders three independent sections—one per category—in this order:
1) Work Projects
2) Academic Projects
3) Personal Projects

Within each category, projects are sorted by `order` ascending, then by `title` ascending (case-insensitive). If `order` is missing/invalid, it is treated as `1000`.

---

## Minimal example

Create a new file: `content/projects/2023-12-01-graph-networks-thesis.md`

```markdown
---
title: "Graph Networks Thesis"
description: "Investigating graph neural networks for spatio-temporal forecasting on urban mobility networks."
order: 2
category: academic
tags:
  - graph-neural-networks
  - spatio-temporal
  - machine-learning
  - pytorch
  - research
---

## Abstract

This academic project explores the efficacy of graph neural networks (GNNs) for spatio-temporal forecasting on urban mobility networks. We evaluate message-passing architectures for learning both the topology and dynamic signals across city-scale road graphs. The thesis compares Graph Convolutional Networks (GCN), Graph Attention Networks (GAT), and Diffusion Convolutional Recurrent Neural Networks (DCRNN) on traffic speed prediction tasks, highlighting the trade-offs between predictive accuracy, interpretability, and computational cost.

## Key Results

- DCRNN achieved the best overall MAE on long horizons
- Attention highlighted corridor-like subgraphs during congestion
```

This will appear under “Academic Projects” on `/projects`, and the detail page will be available at `/projects/graph-networks-thesis`.

---

## Using MDC components (optional)

Markdown content supports MDC components that are already configured in the project. For details and available components refer to:
- `docs/mdc-components-setup.md`

Examples you can embed:
- `::blog-image` to render images with captions and zoom
- `::github-repo-card` to fetch and display GitHub repo metadata

Example usage inside a project markdown:
```markdown
::github-repo-card
---
repo: lancewilhelm/vue-chatbot
---
::
```

---

## How grouping and listing works

- The Projects index page requests a grouped list via an API endpoint and renders three sections, one per category.
- Categories without projects are hidden (no empty sections).
- Each item renders a link, title, and description. Items are ordered by `order` (ascending) and then by `title`.

---

## APIs (for reference)

These APIs power the Projects UI:

- List all project previews:
  - GET `/api/projects/list`
- List project previews by category:
  - GET `/api/projects/list?category=work|academic|personal`
- List project previews grouped by category:
  - GET `/api/projects/list?grouped=true`
- Get a single project (full content) by slug:
  - GET `/api/projects/:slug`

Returned previews contain:
- title, description, order, tags, category, slug, path

Returned project (single) also includes:
- content (the markdown body)

---

## Adding a new project

1) Create a file in `content/projects/`:
   - Prefer `YYYY-MM-DD-<slug>.md` for consistent slugs (date prefix is optional and used only for slug derivation)
2) Add required front matter:
   - `title`, `description`, `order` (optional but recommended), `category`
3) Write the body in Markdown
4) (Optional) Use MDC components for rich content
5) View locally:
   - Start your dev server and open `/projects` to verify it’s visible in the correct section
   - Click through to `/projects/<slug>` to review the detail page

---

## Example files in the repo (samples)

- `content/projects/2024-05-10-analytics-dashboard.md` (category: work)
- `content/projects/2023-12-01-graph-networks-thesis.md` (category: academic)
- `content/projects/2022-08-15-cli-notes-tool.md` (category: personal)

Use these as templates and replace the content as needed.

---

## Troubleshooting

- My project doesn’t show up:
  - Ensure the file is in `content/projects/` and ends with `.md`
  - Check the front matter keys—`title`, `description` are required
  - Make sure `category` is one of `work`, `academic`, or `personal`
  - If using `order`, ensure it’s a valid number (smaller = higher priority)

- The section isn’t visible:
  - Sections only appear if there’s at least one project in that category

- The link to my project looks wrong:
  - The slug is derived from the filename—ensure the filename is correct and unique

---

## Testing checklist

- Add or edit a markdown file in `content/projects/`
- Visit `/projects` and confirm:
  - It appears under the correct category
  - The title and description render correctly
  - Ordering looks correct relative to other items within the same category
- Click the item and confirm:
  - The detail page loads at `/projects/<slug>`
  - The content renders as expected
  - Category label is shown on the detail page
- (If you used components) Verify MDC components render with no console errors

---

## Conventions

- Keep titles concise
- Keep descriptions to a single sentence suitable for list previews
- Use tags sparingly for discoverability
- Use small `order` numbers (e.g., 1–10) for the most important or prominent projects; leave it unset or larger (e.g., 1000) for lower-priority items
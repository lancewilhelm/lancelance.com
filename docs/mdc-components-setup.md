# MDC Components Setup Guide

## Overview

This document explains how to set up custom components for use in markdown files with `@nuxtjs/mdc`.

## Problem

When migrating from `@nuxt/content` to `@nuxtjs/mdc`, custom components used in markdown files (like `::blog-image` and `::github-repo-card`) were not rendering properly.

## Solution

### Component Location

Custom MDC components must be placed in the `app/components/mdc/` directory to be automatically discovered and registered by MDC.

**Directory Structure:**
```
app/
└── components/
    ├── mdc/
    │   ├── BlogImage.vue       ✓ Available in markdown
    │   ├── GithubRepoCard.vue  ✓ Available in markdown
    │   ├── ProseH2.vue          ✓ Overrides default h2 rendering
    │   ├── ProseH3.vue          ✓ Overrides default h3 rendering
    │   ├── ProseH4.vue          ✓ Overrides default h4 rendering
    │   ├── ProsePre.vue         ✓ Available in markdown
    │   └── ProseTable.vue       ✓ Available in markdown
    └── Header.vue               ✗ NOT available in markdown
```

### Component Naming Convention

- **File name:** PascalCase (e.g., `BlogImage.vue`, `GithubRepoCard.vue`)
- **Markdown usage:** kebab-case (e.g., `::blog-image`, `::github-repo-card`)

MDC automatically converts between these naming conventions.

### Component Requirements

1. **Vue Imports:** Explicitly import Vue composables instead of relying on auto-imports
   ```vue
   <script setup lang="ts">
   import { ref, computed } from "vue";
   // ... rest of component
   </script>
   ```

2. **SSR Compatibility:** For components that fetch data, use `useFetch` instead of browser `fetch`
   ```vue
   // ❌ Wrong - doesn't work with SSR
   const repoData = ref(null);
   fetch('https://api.github.com/repos/' + repo)
     .then(r => r.json())
     .then(data => repoData.value = data);

   // ✓ Correct - works with SSR
   const { data: repoData } = await useFetch(
     `https://api.github.com/repos/${repo}`,
     { key: `github-repo-${repo}` }
   );
   ```

## Prose Components

Prose components (prefixed with `Prose`) automatically override the default MDC rendering for HTML elements. These are especially useful for customizing how markdown headings, code blocks, and tables are rendered.

### Prose Heading Components (H2, H3, H4)

The heading components add a copy-link-to-clipboard feature that appears on hover. This allows users to easily share links to specific sections of your content.

**Files:**
- `app/components/mdc/ProseH2.vue`
- `app/components/mdc/ProseH3.vue`
- `app/components/mdc/ProseH4.vue`

**Usage:**
These components automatically replace all `## H2`, `### H3`, and `#### H4` headings in your markdown files. No special syntax is needed - just write normal markdown headings.

**Features:**
- Copy link button appears on hover
- Uses Lucide icons (`lucide:link` and `lucide:check`)
- Copies full URL with hash anchor to clipboard
- Shows check icon for 2 seconds after copying
- Fully accessible with ARIA labels

**Component code example (ProseH2.vue):**
```vue
<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    id: {
        type: String,
        default: '',
    },
})

const isHovered = ref(false)
const copied = ref(false)

function copyHeaderLink(id: string) {
    if (!id) return

    const baseUrl = window.location.origin + window.location.pathname
    const fullUrl = `${baseUrl}#${id}`
    navigator.clipboard.writeText(fullUrl)
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2000)
}
</script>

<template>
    <h2
        :id="id"
        class="flex items-center gap-2 group"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <slot />
        <button
            v-if="isHovered"
            type="button"
            class="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            :aria-label="copied ? 'Link copied' : 'Copy link to heading'"
            @click="copyHeaderLink(id)"
        >
            <Icon
                v-if="copied"
                name="lucide:check"
                class="text-(--main-color)"
            />
            <Icon
                v-else
                name="lucide:link"
                class="text-(--main-color)"
            />
        </button>
    </h2>
</template>
```

## Example Components

### BlogImage Component

**File:** `app/components/mdc/BlogImage.vue`

**Usage in markdown:**
```markdown
::blog-image
---
imagePath: /img/vue-chatbot/vuejsstructure.png
caption: The basic Vue.js web app structure.
width: 300px
---
::
```

**Component code:**
```vue
<script setup lang="ts">
import { ref } from "vue";

defineProps({
  imagePath: { type: String, default: "" },
  caption: { type: String, default: "" },
  width: { type: String, default: "" },
  height: { type: String, default: "" },
});

const zoomed = ref(false);
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-2 my-[10px]">
    <div :style="[width ? 'width:' + width : '']" class="max-w-full">
      <img :src="imagePath" class="w-full cursor-pointer" @click="zoomed = true" />
    </div>
    <div class="italic max-w-[80vw]">
      <slot name="caption" />
      {{ caption }}
    </div>
    <ImageZoom v-if="zoomed" @close="zoomed = false" :image-path="imagePath" />
  </div>
</template>
```

### GithubRepoCard Component

**File:** `app/components/mdc/GithubRepoCard.vue`

**Usage in markdown:**
```markdown
::github-repo-card
---
repo: lancewilhelm/vue-chatbot
---
::
```

**Component code:**
```vue
<script setup lang="ts">
import githubLanguageColors from "~/assets/github_colors.json";

const props = defineProps({
  repo: { type: String, default: "" },
});

const { data: repoData } = await useFetch(
  `https://api.github.com/repos/${props.repo}`,
  { key: `github-repo-${props.repo}` }
);
</script>

<template>
  <div v-if="repoData" class="flex flex-col self-center gap-[5px] font-mono max-w-[300px] rounded-lg p-[10px] bg-(--sub-color) shadow-[4px_6px_0_rgba(0,0,0,1)] my-[10px]">
    <a :href="repoData.html_url" class="no-underline!">
      <div class="flex items-center gap-[3px]">
        <Icon name="fa6-brands:github" class="text-(--main-color)" />
        {{ repoData.full_name }}
      </div>
    </a>
    <div class="italic font-sans">{{ repoData.description }}</div>
    <div class="flex gap-[15px]">
      <div class="flex items-center gap-[3px]">
        <div class="w-[15px] h-[15px] rounded-full" 
             :style="{ backgroundColor: githubLanguageColors[repoData.language].color }">
        </div>
        {{ repoData.language }}
      </div>
      <div class="flex items-center gap-[3px]">
        <Icon name="fa6-solid:star" class="text-(--main-color)" />
        {{ repoData.stargazers_count }}
      </div>
      <div class="flex items-center gap-[3px]">
        <Icon name="fa6-solid:code-fork" class="text-(--main-color)" />
        {{ repoData.forks_count }}
      </div>
    </div>
  </div>
</template>
```

## Nuxt Config

Custom components in `components/mdc/` are auto-discovered. You can optionally map built-in prose components:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // @ts-ignore - mdc configuration is provided by @nuxtjs/mdc
  mdc: {
    components: {
      prose: true,
      map: {
        pre: "ProsePre",    // Custom code block component
        table: "ProseTable", // Custom table component
      },
    },
    remarkPlugins: {
      "remark-math": {},
    },
    rehypePlugins: {
      "rehype-katex": {},
    },
  },
});
```

## Testing

After moving components to `app/components/mdc/`:

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Check prerendered pages:**
   ```bash
   # Verify components are rendered in HTML
   grep -i "imagePath\|github" dist/blog/[post-slug]/index.html
   ```

3. **Preview locally:**
   ```bash
   pnpm preview
   # or
   npx wrangler pages dev dist
   ```

4. **Verify in browser:**
   - Navigate to a blog post with custom components
   - Check that images load properly
   - Check that GitHub cards display repo information
   - Verify no console errors

## Common Issues

### Issue: Component not rendering

**Cause:** Component is in `app/components/` instead of `app/components/mdc/`

**Solution:** Move component to `app/components/mdc/` directory

### Issue: "ref is not defined" error

**Cause:** Relying on Nuxt auto-imports in MDC components

**Solution:** Explicitly import from Vue:
```vue
<script setup lang="ts">
import { ref, computed } from "vue";
</script>
```

### Issue: Component data not showing in SSR

**Cause:** Using browser `fetch()` instead of Nuxt's `useFetch`

**Solution:** Use `useFetch` with a unique key:
```vue
const { data } = await useFetch(url, { key: 'unique-key' });
```

### Issue: TypeScript errors for composables

**Cause:** Type definitions not available before Nuxt generates types

**Solution:** Add shim files in `types/` directory or run `nuxt prepare` first

## References

- [@nuxtjs/mdc Documentation](https://github.com/nuxt-modules/mdc)
- [Nuxt Components Directory](https://nuxt.com/docs/guide/directory-structure/components)
- [MDC Syntax Guide](https://content.nuxt.com/usage/markdown)

## Summary

To use custom components in markdown with MDC:

1. ✅ Place components in `app/components/mdc/`
2. ✅ Use PascalCase for file names (e.g., `BlogImage.vue`)
3. ✅ Use kebab-case in markdown (e.g., `::blog-image`)
4. ✅ Explicitly import Vue composables (`ref`, `computed`, etc.)
5. ✅ Use `useFetch` for data fetching instead of browser `fetch()`
6. ✅ Test with `pnpm build` to ensure SSR rendering works
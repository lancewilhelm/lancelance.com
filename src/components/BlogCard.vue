<script setup lang="ts">
import { formatPublicationDate } from "@/utils/date";
import type { BlogPostEntry } from "@/content/blog";

defineProps<{
  post: BlogPostEntry;
}>();
</script>

<template>
  <RouterLink
    :to="post.path"
    class="p-[5px] pl-[10px] border-l-[3px] border-l-(--sub-color) hover:border-l-(--main-color) no-underline! transition duration-[300ms] blog-card"
  >
    <div class="grid grid-cols-[1fr_auto] items-center gap-x-[14px]">
      <div class="flex flex-col gap-[4px]">
        <div class="font-bold text-xl leading-snug">
          {{ post.title }}
        </div>
        <div>
          {{ post.description }}
        </div>
      </div>
      <div
        class="text-right text-[var(--sub-text-color,var(--sub-color))] italic sm:text-nowrap"
      >
        {{ formatPublicationDate(post.date) }}
      </div>
    </div>
  </RouterLink>
</template>

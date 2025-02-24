<script setup lang="ts">
definePageMeta({
  layout: 'blog'
})
const route = useRoute()
const page = await queryCollection('blog').path(route.path).first()
useHead({
  title: page.title,
  description: page.description,
  ogTitle: page.title,
  ogDescription: page.description,
  ogUrl: `https://lancelance.dev${route.path}`,
  twitterTitle: page.title,
  twitterDescription: page.description,
  twitterUrl: `https://lancelance.dev${route.path}`,
})
</script>

<template>
  <div class="w-full text-wrap sm:px-4">
    <h1>{{ page.title }}</h1>
    <div class='italic pb-2 text-(--sub-color)'>{{ new Date(page.date).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year:
        'numeric'
    }) }}</div>
    <ContentRenderer v-if="page" :value="page" class="flex flex-col gap-2 content" />
  </div>
</template>

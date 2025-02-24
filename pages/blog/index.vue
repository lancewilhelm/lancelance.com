<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
  appleMobileWebAppTitle: 'Blog- LanceLance'
})
definePageMeta({
  layout: 'blog'
})

const posts = await queryCollection('blog').all().then((res) => {
  res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return res
})
</script>

<template>
  <div class="flex flex-col max-w-[700px] self-center gap-[20px]">
    <BlogCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

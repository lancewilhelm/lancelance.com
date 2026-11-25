<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    Staf is a self-hosted workspace for AI assistants, built around the
    terminal, that keeps conversations running in the background when you
    disconnect.
  </p>
  <BlogImage
    eager
    image-path="/img/staf/cover.png"
    alt="Staf personal AI assistant runtime overview graphic"
    width="700px"
  />
  <ProseHeading id="what-it-does" :level="2">What It Does</ProseHeading>
  <ul>
    <li>
      Keeps a persistent local instance running so that you can detach from the
      terminal or browser and pick up the same conversation later.
    </li>
    <li>
      Supports multiple separate assistants, each with its own instructions and
      settings stored as plain files on disk.
    </li>
    <li>
      Works with ChatGPT, OpenRouter, local models via LM Studio, and custom
      endpoints.
    </li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/Staf" />
</template>

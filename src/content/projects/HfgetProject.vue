<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    <code>hfget</code> is a terminal tool for searching and downloading models
    from Hugging Face. I made it so that I would not have to open a browser just
    to find specific model files while working in the terminal.
  </p>
  <BlogImage
    eager
    image-path="/img/hfget/screenshot.png"
    alt="hfget interactive terminal screenshot searching for Qwen3 models on Hugging Face"
    caption="Searching and filtering Hugging Face models in the terminal"
    width="520px"
  />
  <ProseHeading id="what-it-does" :level="2">What It Does</ProseHeading>
  <ul>
    <li>
      Search and filter Hugging Face repositories interactively, inspect the
      files inside a repository, and select one or more files to download.
    </li>
    <li>
      Shows download progress, speed, and estimated time remaining, prompts on
      conflicts with existing files, and removes partial files if canceled.
    </li>
    <li>
      Saves downloaded models either into nested folders by repository or into a
      single flat directory based on local settings.
    </li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/hfget" />
</template>

<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    After getting used to
    <a
      href="https://github.com/nvimdev/dashboard-nvim"
      target="_blank"
      rel="noopener noreferrer"
      ><code>dashboard-nvim</code></a
    >
    in Neovim, I wanted a similar plain, text-based start screen in VS Code
    instead of the default Welcome tab.
  </p>
  <BlogImage
    eager
    image-path="/img/nvim-dashboard-vscode/dash.png"
    alt="Nvim Dashboard for VS Code start screen showing custom header, shortcut keys, and recent projects"
    caption="Text-based start screen inside VS Code"
    width="760px"
  />
  <ProseHeading id="what-it-does" :level="2">What It Does</ProseHeading>
  <ul>
    <li>
      Shows recent projects and recent files with single-key shortcuts to open
      them.
    </li>
    <li>
      Supports custom header art, custom bottom text, and configurable
      shortcuts.
    </li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/nvim-dashboard-vscode" />
</template>

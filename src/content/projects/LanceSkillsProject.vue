<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    <code>lance-skills</code> is where I keep reusable skills for AI agents.
    Each folder packages instructions, templates, and helper scripts for a
    specific workflow. Right now it contains one skill, with more planned as I
    add them.
  </p>
  <ProseHeading id="the-morning-intel" :level="2"
    >The Morning Intel</ProseHeading
  >
  <p>
    The first skill in the repository is <strong>The Morning Intel</strong>. It
    researches a configured list of news topics, checks claims against primary
    sources, pulls local weather and running windows, and formats everything
    into a 2–3 page two-column PDF newspaper.
  </p>
  <BlogImage
    eager
    image-path="/img/lance-skills/sample-page-1.png"
    alt="Sample first page of The Morning Intel two-column PDF newspaper"
    caption="Sample issue page 1 — summary, local weather and running window, reminders, and topic briefs"
    width="680px"
  />
  <ul>
    <li>
      Guides the agent to verify numbers and announcements against original
      sources and highlights unverified or vendor-only claims in the text.
    </li>
    <li>
      Outputs a two-column PDF newspaper layout rather than a plain text or
      markdown email.
    </li>
    <li>
      Includes an automated check on the generated PDF to catch page overflow or
      formatting issues before scheduled delivery.
    </li>
  </ul>
  <BlogImage
    image-path="/img/lance-skills/sample-page-2.png"
    alt="Sample second page of The Morning Intel PDF newspaper"
    caption="Sample issue page 2"
    width="680px"
  />
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/lance-skills" />
</template>

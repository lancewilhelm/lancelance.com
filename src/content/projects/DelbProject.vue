<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    Delb is a self-hosted web app for managing and reading a personal collection
    of ebooks and PDFs. I built it to be small and self-contained enough to run
    on modest hardware like a Raspberry Pi or a home server without needing
    external services.
  </p>
  <BlogImage
    eager
    image-path="/img/delb/library.png"
    alt="Delb library grid view displaying book covers, authors, and navigation bar"
    caption="Delb library grid view"
    width="760px"
  />
  <ProseHeading id="what-it-does" :level="2">What It Does</ProseHeading>
  <ul>
    <li>
      Each user gets a personal library where uploaded books go by default.
      Books can also be added to shared collections—similar to photo
      albums—without duplicating files.
    </li>
    <li>
      You can import existing Calibre libraries directly, which copies books,
      covers, authors, series, and metadata into Delb.
    </li>
    <li>
      Delb runs offline with everything bundled together, including browsing,
      search, and built-in reading views.
    </li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/delb" />
</template>

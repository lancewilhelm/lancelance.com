<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    Shpacer is a self-hosted web app that I built for planning race courses. I
    wanted one place to upload a route file, view the map and elevation profile
    together, mark aid stations and splits, and keep notes for a race.
  </p>
  <BlogImage
    eager
    image-path="/img/shpacer/course.png"
    alt="Shpacer course planner showing the 2026 Canyons 100k elevation profile, interactive route map, and aid station waypoints sidebar"
    caption="Viewing the 2026 Canyons 100k course with elevation profile, route map, and aid station waypoints"
    width="760px"
  />
  <ProseHeading id="what-it-does" :level="2">What It Does</ProseHeading>
  <ul>
    <li>
      When you upload a GPS route file, the app calculates total distance,
      elevation gain, and elevation loss, and saves the course alongside the
      race date and notes.
    </li>
    <li>
      The course view pairs an interactive route map with an elevation chart,
      and hovering along the elevation profile highlights that spot on the map.
    </li>
    <li>
      You can import waypoints from the route file or place them directly on the
      map or elevation chart, then drag them along the course to track distance
      and elevation between aid stations, climbs, and cutoffs.
    </li>
    <li>
      It supports multiple pacing plans per race, light and dark themes, and
      switching between miles and kilometers.
    </li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/shpacer" />
</template>

<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    Shpacer is a self-hosted web app I built for planning race courses. I wanted
    one place to upload a route file, look at the map and elevation profile
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
      Uploading a GPS route file calculates total distance, elevation gain, and
      elevation loss, and stores the course alongside race date and notes.
    </li>
    <li>
      Displays an interactive route map paired with an elevation chart; hovering
      along the elevation profile highlights that spot on the map.
    </li>
    <li>
      Waypoints can be imported from the route file or placed directly on the
      map or elevation chart and dragged along the course to track distance and
      elevation between aid stations, climbs, or cutoffs.
    </li>
    <li>
      Supports multiple pacing plans per race, light and dark themes, and
      switching between miles and kilometers.
    </li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/shpacer" />
</template>

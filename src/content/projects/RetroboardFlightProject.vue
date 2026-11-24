<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    Retroboard Flight is a spin-off of my
    <RouterLink to="/projects/retroboard">Retroboard</RouterLink> LED display
    project. It watches for nearby aircraft using public flight data and shows
    live flight cards on a small tabletop LED panel alongside a map in the
    browser.
  </p>
  <BlogImage
    eager
    image-path="/img/retroboard-flight/cover.png"
    alt="Retroboard Flight LED matrix display mockup showing callsign, route, aircraft type, altitude, speed, and bearing"
    width="700px"
  />
  <ProseHeading id="how-it-works" :level="2">How It Works</ProseHeading>
  <p>
    A local server polls public flight positions around a chosen point on the
    map, continuing in the background even when no browser is open. The browser
    preview shows the same pixel grid that is sent to the physical LED board.
  </p>
  <ul>
    <li>
      You can pick a center point on the map, set a search radius, and choose
      whether to include or ignore aircraft on the ground.
    </li>
    <li>
      The display rotates through nearby flights showing callsign, route,
      aircraft type, altitude, speed, distance, and bearing.
    </li>
    <li>
      Runs locally using free public flight data with no accounts or paid
      subscriptions required.
    </li>
  </ul>
</template>

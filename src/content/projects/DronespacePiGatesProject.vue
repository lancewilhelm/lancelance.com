<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    Before DroneSpace (an indoor FPV drone racing venue) closed, I wrote the
    software that controlled its illuminated race gates and course pillars. Each
    gate and pillar ran on a Raspberry Pi connected over the local network so
    they could all be controlled together from a single web page.
  </p>
  <BlogImage
    eager
    image-path="/img/dronespace-pi-gates/gates.jpg"
    alt="Illuminated FPV drone racing gates lit with LEDs inside DroneSpace"
    caption="Synced LED FPV drone gates at DroneSpace"
    width="640px"
  />
  <ProseHeading id="how-it-worked" :level="2">How It Worked</ProseHeading>
  <ul>
    <li>
      A central controller kept colors and lighting animations synced across
      every gate and pillar on the track, driving hundreds of LEDs per gate.
    </li>
    <li>
      Race organizers used a local web page to set solid colors, pick custom RGB
      values, or run patterns across individual gates or the whole course.
    </li>
    <li>
      Remote commands over the same network made it possible to reboot, shut
      down, or update the software on every gate without physically accessing
      each Pi.
    </li>
  </ul>
  <p>
    Parts of this local web-controlled LED setup later carried over into my
    <RouterLink to="/projects/ppbc">Ping Pong Ball Clock</RouterLink>.
  </p>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/DroneSpacePiGates" />
</template>

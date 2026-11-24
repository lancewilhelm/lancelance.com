<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="inspiration" :level="2">Inspiration</ProseHeading>
  <p>A Reddit post originally tipped me off to the project. This <a href="https://www.thingiverse.com/thing:4091854" target="_blank" rel="noopener noreferrer">Thingiverse</a> build detailed some 3D-printed parts for a ping pong ball clock. Digging a little deeper, I found an <a href="https://www.instructables.com/id/Ping-Pong-Ball-LED-Clock/" target="_blank" rel="noopener noreferrer">Instructables</a> design that skipped 3D printing altogether and optimized the LED placement. I used that Instructables build as the basis for the hardware, but I knew from the start I wanted to drive it with a Raspberry Pi Zero and build on a previous local web-app LED controller I'd written.</p>
  <ProseHeading id="design-concept" :level="2">Design Concept</ProseHeading>
  <p>The firmware is written in Python because it's quick to iterate on and has two libraries that do the heavy lifting:</p>
  <ul>
    <li>Neopixel libraries (LED drivers)</li>
    <li>Flask (web server)</li>
  </ul>
  <p>Because of the zig-zag layout of the LED strips behind the balls, I had to write custom font tables and character-rendering functions from scratch. The only code carried over from earlier projects was basic single-LED illumination.</p>
  <BlogImage eager image-path="/img/ppbc/layout visualizer-01.jpg" alt="Ping pong ball clock LED wiring and coordinate layout" caption="PPBC wiring design concept. Mapping LED indices to 2D grid coordinates made driver work much easier, using 999 for empty cells with no ball." width="640px" />
  <p>I also designed custom font libraries so you aren't stuck with the single digit font from the original reference build, expanding from digits to full characters for weather readouts and custom messages.</p>
  <BlogImage image-path="/img/ppbc/layout visualizer-02.jpg" alt="Ping pong ball clock layout visualization" width="640px" />
  <BlogImage image-path="/img/ppbc/layout visualizer-03.jpg" alt="Ping pong ball clock layout visualization with LED coordinates" width="640px" />
  <BlogImage image-path="/img/ppbc/layout visualizer-04.jpg" alt="Ping pong ball clock font designs" caption="PPBC font designs." width="640px" />
  <ProseHeading id="implementation" :level="2">Implementation</ProseHeading>
  <p>The backend runs a continuous update loop alongside a threaded Flask server that handles both the web UI and the control API. API requests mutate state on a shared <code>PingPongBoard</code> object—which holds the LED driver helpers, color animations, and display modes (time, date, weather, messages)—and take effect on the next pass of the loop. Both frontend and backend live on the Raspberry Pi itself, so anything on the local network can control the clock from a browser.</p>
  <p>I still tinker with this one occasionally—recent updates added scheduled display presets and smoothed out rainbow animation timing while scrolling text.</p>
  <ProseHeading id="video" :level="2">Video</ProseHeading>
  <div class="flex justify-center text-center"><iframe width="800" height="500" src="https://www.youtube.com/embed/jIoWmhVCPb4" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  <p>At the time of this post the video had 17K views! Thank you all for the support, and I hope you've been able to build PPBCs of your own.</p>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/pingPongBallClock" />
  <ProseHeading id="future-work" :level="2">Future Work</ProseHeading>
  <ProseHeading id="web-app" :level="4">Web App</ProseHeading>
  <p>The web UI could use a modern refresh with Vue or React, served as static assets straight out of Flask to keep deployment dead simple on a Pi Zero.</p>
  <ProseHeading id="drivers" :level="4">Drivers</ProseHeading>
  <p>Moving away from a single tight loop—where full-board animations drag down polling and frame responsiveness—by separating API handling and rendering with cleaner async/threaded tasks would make transitions feel much snappier.</p>
</template>

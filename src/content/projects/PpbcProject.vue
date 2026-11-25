<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="inspiration" :level="2">Inspiration</ProseHeading>
  <p>A Reddit post first introduced me to this project. It linked to a <a href="https://www.thingiverse.com/thing:4091854" target="_blank" rel="noopener noreferrer">Thingiverse</a> build that used 3D-printed parts for a ping pong ball clock. After digging a little deeper, I found an <a href="https://www.instructables.com/id/Ping-Pong-Ball-LED-Clock/" target="_blank" rel="noopener noreferrer">Instructables</a> design that skipped 3D printing altogether and improved the LED placement. I used that Instructables design as the basis for the hardware, but I knew from the start that I wanted to run it on a Raspberry Pi Zero and build on an earlier web-controlled LED project that I had written.</p>
  <ProseHeading id="design-concept" :level="2">Design Concept</ProseHeading>
  <p>The firmware is written in Python because it is quick to iterate on and has two libraries that do the heavy lifting:</p>
  <ul>
    <li>Neopixel libraries (LED drivers)</li>
    <li>Flask (web server)</li>
  </ul>
  <p>Because of the zig-zag layout of the LED strips behind the balls, I had to write custom font tables and character-rendering functions from scratch. The only code that carried over from earlier projects was basic code for lighting individual LEDs.</p>
  <BlogImage eager image-path="/img/ppbc/layout visualizer-01.jpg" alt="Ping pong ball clock LED wiring and coordinate layout" caption="PPBC wiring design concept. Mapping LED indices to 2D grid coordinates made driver work much easier, using 999 for empty cells with no ball." width="640px" />
  <p>I also designed custom font libraries so that you are not stuck with the single digit font from the original build. Expanding beyond digits to full character sets made it possible to display weather readouts and custom messages.</p>
  <BlogImage image-path="/img/ppbc/layout visualizer-02.jpg" alt="Ping pong ball clock layout visualization" width="640px" />
  <BlogImage image-path="/img/ppbc/layout visualizer-03.jpg" alt="Ping pong ball clock layout visualization with LED coordinates" width="640px" />
  <BlogImage image-path="/img/ppbc/layout visualizer-04.jpg" alt="Ping pong ball clock font designs" caption="PPBC font designs." width="640px" />
  <ProseHeading id="implementation" :level="2">Implementation</ProseHeading>
  <p>The backend runs a continuous update loop alongside a threaded Flask server that handles both the web UI and the control API. API requests update state on a shared <code>PingPongBoard</code> object, which holds the LED driver helpers, color animations, and display modes (time, date, weather, and messages). Those updates take effect on the next pass of the loop. Both the frontend and backend run on the Raspberry Pi itself, so any device on the local network can control the clock from a browser.</p>
  <p>I still tinker with this project occasionally. Recent updates added scheduled display presets and smoothed out the timing for the rainbow animation while scrolling text.</p>
  <ProseHeading id="video" :level="2">Video</ProseHeading>
  <div class="flex justify-center text-center"><iframe width="800" height="500" src="https://www.youtube.com/embed/jIoWmhVCPb4" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  <p>At the time of this post, the video had 17K views! Thank you all for the support, and I hope that you have been able to build PPBCs of your own.</p>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/pingPongBallClock" />
  <ProseHeading id="future-work" :level="2">Future Work</ProseHeading>
  <ProseHeading id="web-app" :level="4">Web App</ProseHeading>
  <p>The web UI could use a modern refresh with Vue or React, served as static assets straight out of Flask to keep deployment simple on a Pi Zero.</p>
  <ProseHeading id="drivers" :level="4">Drivers</ProseHeading>
  <p>Right now, a single tight loop handles everything, so full-board animations slow down polling and frame responsiveness. Separating API handling from rendering with cleaner async or threaded tasks would make transitions much smoother.</p>
</template>

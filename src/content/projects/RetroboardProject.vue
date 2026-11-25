<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="about" :level="2">About</ProseHeading>
  <p>Retroboard is a DIY RGB LED matrix display and web app powered by a Raspberry Pi, inspired by the Tidbyt Kickstarter.</p>
  <p>The hardware setup uses a Raspberry Pi 3B+, an Adafruit RGB Matrix HAT, a 5V power supply, and a 64×32 P3 RGB LED matrix panel driven by hzeller's <code>rpi-rgb-led-matrix</code> library. On the software side, I split it into two Dockerized services—a React web app and a Flask API—so that each piece can be built and tested independently while keeping the Python API right next to the code that drives the LEDs.</p>
  <p>I kept this initial build simple with a few built-in applets (like a clock and a stock chart), with the longer-term idea of making it easy to add custom apps. More recently, I spun off a dedicated aircraft tracker on the same 64×32 LED matrix in <RouterLink to="/projects/retroboard-flight">Retroboard Flight</RouterLink>.</p>
  <BlogImage eager image-path="/img/retroboard/IMG_0982_crop.jpg" alt="Retroboard LED matrix displaying a clock" caption="Retroboard snapshot with a couple of built-in apps (clock and stock chart)." width="640px" />
  <BlogImage image-path="/img/retroboard/IMG_0977.JPG" alt="Retroboard internal components and Raspberry Pi" caption="Retroboard internals. The Raspberry Pi hosts both the LED matrix driver and the local web app." width="640px" />
  <BlogImage image-path="/img/retroboard/sim.JPG" alt="Retroboard online display simulator" caption="Browser-based display simulator for iterating on pixel layouts without being plugged into the physical board." width="640px" />
  <ProseHeading id="future-work" :level="2">Future Work</ProseHeading>
  <p>I would still like to add a simple app store so that anyone can package and run custom applets, clean up the async handoff between the web API and the loop that drives the LEDs, and eventually add Bluetooth provisioning so that initial setup does not require connecting the Pi to Wi-Fi first.</p>
  <GithubRepoCard repo="lancewilhelm/retroboard" />
</template>

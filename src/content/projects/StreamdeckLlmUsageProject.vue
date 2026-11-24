<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    I liked how T3 Code displayed AI subscription usage and didn't want to sift
    through the dozens of existing usage plugins on the Stream Deck marketplace,
    so I made yet another one. The main difference is that each gauge shows the
    approximate linear burn rate for the current limit window, similar to T3
    Code. I like having that reference.
  </p>
  <BlogImage
    eager
    image-path="/img/streamdeck-llm-usage/hero.png"
    alt="A Stream Deck filled with LLM Usage keys showing ring and bar gauges for Claude, Codex, and Gemini"
    caption="Ring and bar layouts across Claude, Codex, and Gemini limit windows"
    width="720px"
  />
  <ProseHeading id="how-it-works" :level="2">How It Works</ProseHeading>
  <p>
    The plugin tracks Claude, Codex, and Google AI subscription limits on Stream
    Deck keys as either a ring or a bar. Every limit window resets on a
    schedule, and the white tick on the gauge marks where an even, linear burn
    rate would put usage at the current time. That shows whether usage is ahead
    of or behind pace before the window resets.
  </p>
  <BlogImage
    image-path="/img/streamdeck-llm-usage/anatomy.png"
    alt="Anatomy of a Stream Deck LLM Usage key showing provider, window, fuel left, fill, pace tick, shortfall, and time until reset"
    caption="Anatomy of a single key gauge"
    width="640px"
  />
  <p>
    Pressing a key cycles through its enabled windows (such as 5-hour session
    caps, weekly limits, or per-model windows). Holding a key forces a refresh.
    If a refresh fails, the key dims and keeps displaying the last good reading.
    Each key can be configured independently for ring or bar style, remaining vs.
    used display, color mode, and whether the bottom line shows time until reset
    or distance from pace.
  </p>
  <BlogImage
    image-path="/img/streamdeck-llm-usage/gallery.png"
    alt="Gallery of ring and bar styles, remaining and used gauges, color modes, and pace states"
    caption="Gauge styles, color modes, and pace states"
    width="640px"
  />
  <p>
    The plugin reads existing local sign-ins in read-only mode so it does not
    require separate credentials or interfere with active sessions.
  </p>
</template>

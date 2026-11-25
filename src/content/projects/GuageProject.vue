<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    Guage is a self-hosted chat app for talking to both local AI models and
    cloud providers from one interface. After trying several existing front-ends
    and running into either busy layouts or missing provider support, I built my
    own.
  </p>
  <p>
    It is a follow-up to the small chatbot that I wrote a
    <RouterLink to="/blog/vue-chatbot1">three-part blog series</RouterLink>
    about in 2023.
  </p>
  <BlogImage
    eager
    image-path="/img/guage/cover.png"
    alt="Guage self-hosted LLM frontend overview showing supported local and cloud providers"
    width="700px"
  />
  <ProseHeading id="what-it-does" :level="2">What It Does</ProseHeading>
  <ul>
    <li>
      Connects to locally hosted models as well as OpenAI, Anthropic, Google
      Gemini, and Cerebras from the same interface.
    </li>
    <li>
      Runs as a self-hosted app so that chat history stays on local hardware.
    </li>
    <li>Includes custom themes and basic configuration options.</li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/guage" />
</template>

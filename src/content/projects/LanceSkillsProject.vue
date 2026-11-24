<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    <code>lance-skills</code> is where I keep reusable skills for AI agents in
    the open Agent Skills layout (<code>SKILL.md</code> plus optional templates,
    references, and helper scripts). I use them across Hermes Agent, Claude
    Code, Codex, and Antigravity. Right now the repository includes two skills:
    a full PDF briefing workflow and a prompt-only writing and editing skill.
  </p>
  <ProseHeading id="the-morning-intel" :level="2"
    >The Morning Intel</ProseHeading
  >
  <p>
    <strong>The Morning Intel</strong> researches a configured list of news
    topics, checks claims against primary sources, pulls local weather and
    running windows, and formats everything into a 2–3 page two-column PDF
    newspaper.
  </p>
  <BlogImage
    eager
    image-path="/img/lance-skills/sample-page-1.png"
    alt="Sample first page of The Morning Intel two-column PDF newspaper"
    caption="Sample issue page 1 — summary, local weather and running window, reminders, and topic briefs"
    width="680px"
  />
  <ul>
    <li>
      Guides the agent to verify numbers and announcements against original
      sources and highlights unverified or vendor-only claims in the text.
    </li>
    <li>
      Outputs a two-column PDF newspaper layout rather than a plain text or
      markdown email.
    </li>
    <li>
      Includes an automated check on the generated PDF to catch page overflow or
      formatting issues before scheduled delivery.
    </li>
  </ul>
  <BlogImage
    image-path="/img/lance-skills/sample-page-2.png"
    alt="Sample second page of The Morning Intel PDF newspaper"
    caption="Sample issue page 2"
    width="680px"
  />
  <ProseHeading id="plain-english" :level="2">Plain English</ProseHeading>
  <p>
    <strong>Plain English</strong> is a self-contained, prompt-only skill that
    rewrites or drafts human-facing prose so that it reads cleanly on the first
    pass without losing technical precision. It is based on the psycholinguistic
    findings in Clark, Martin, and Mahowald (2026),
    <a
      href="https://arxiv.org/abs/2610.29162"
      target="_blank"
      rel="noopener noreferrer"
      ><em>Why is AI-generated language so hard to understand?</em></a
    >, which shows that post-trained reasoning models overuse compressed
    syntactic constructions that strain human working memory.
  </p>
  <ul>
    <li>
      Audits drafts against six specific patterns that frontier models overuse:
      dropped <code>that</code> and <code>which</code> relativizers, chains of
      three or more stacked nouns, animate verbs paired with inanimate subjects,
      ad-hoc verbed nouns, long gaps between subjects and verbs, and dense
      word chains.
    </li>
    <li>
      Uses a three-step editing workflow—sentence audit, paraphrase pass, and
      fidelity check—so that technical facts, numbers, and code identifiers stay
      intact while sentence structure becomes easier to follow.
    </li>
    <li>
      Includes presets for engineering docs, executive memos and policy briefs,
      and long-session handoffs, with no scripts or external dependencies so
      that it works across agent harnesses or as a standalone system prompt.
    </li>
  </ul>
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/lance-skills" />
</template>

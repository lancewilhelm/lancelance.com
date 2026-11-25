<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    CommCoach is the system behind my PhD research in Human-Computer Interaction
    at Virginia Tech. In this project, I studied whether AI can give managers
    and emerging leaders a low-stakes space to practice difficult workplace
    conversations and reflect on how they communicate.
  </p>
  <p>
    CommCoach pairs two AI roles in one web app: a conversation partner that
    role-plays a colleague or direct report in a workplace scenario, and a coach
    that observes the exchange, tracks learning goals, and prompts reflection.
  </p>
  <BlogImage
    eager
    image-path="/img/commcoach/roleplay.png"
    alt="CommCoach Phase 2 role-play interface showing scenario prompt, conversation turns, goal progress, conversation phases, and coach feedback panel"
    caption="CommCoach role-play workspace with conversation phases, learning goals, and coach feedback"
    width="720px"
  />
  <ProseHeading id="phase-1-exploratory-study-cui-2025" :level="2"
    >Phase 1: Exploratory Study (CUI 2025)</ProseHeading
  >
  <p>
    I built the first prototype early in my PhD to study how practicing managers
    think about and react to AI-assisted conversational training.
  </p>
  <p>
    We published the results of that exploratory study in
    <em
      >"How Managers Perceive AI-Assisted Conversational Training for Workplace
      Communication"</em
    >
    at <strong>ACM CUI 2025</strong>. The study identified four design
    tensions:
  </p>
  <ol>
    <li>
      Managers use very different communication styles, such as humor,
      storytelling, asking questions, and directness. Rigid feedback from AI can
      unfairly mark valid personal styles as mistakes.
    </li>
    <li>
      Participants wanted practice partners that could push back, get defensive,
      or stay reserved, which creates a risk of stereotyping by the AI. Even
      early on, changing a user's name alone altered how the AI coach responded,
      so I masked names before sending messages to the model.
    </li>
    <li>
      Real workplace conversations have clear objectives and wrap-ups, while
      open-ended AI role-plays can drift indefinitely without explicit goals and
      phases.
    </li>
    <li>
      Managers valued having a non-judgmental space to retry tough
      conversations, but still viewed AI as a supplement to human mentors and
      peers rather than a replacement.
    </li>
  </ol>
  <BlogImage
    image-path="/img/commcoach/framework.png"
    alt="CommCoach design framework diagram connecting user input, contextual interpreter, partner simulation, feedback module, human-AI teaming, and organizational objectives"
    caption="Design framework synthesized from Phase 1 findings"
    width="760px"
  />
  <ProseHeading id="phase-2-rebuild-and-multi-week-study" :level="2"
    >Phase 2: Rebuild &amp; Multi-Week Study</ProseHeading
  >
  <p>
    For Phase 2, I rebuilt CommCoach to support ongoing, short practice sessions
    over several weeks rather than one-off lab sessions.
  </p>
  <ul>
    <li>
      New users go through a short onboarding that covers their role, goals, and
      communication challenges so that scenarios and coaching fit their context.
    </li>
    <li>
      Each role-play tracks conversation phases and 2–4 learning goals as the
      conversation progresses, followed by a brief self-reflection.
    </li>
    <li>
      The app includes weekly questionnaires and dashboards for researchers to
      run and monitor the study.
    </li>
  </ul>
  <ProseHeading id="status" :level="3">Status</ProseHeading>
  <p>
    Across campus outreach and online recruitment,
    <strong>122 learner accounts</strong> submitted
    <strong>347 weekly questionnaires</strong> and completed
    <strong>491 AI role-plays</strong>, including
    <strong>484 self-reflections</strong> (about 99% of finished sessions).
  </p>
  <p>
    The hardest part of the study was keeping participants active across
    multiple weeks, not building the software. Participant drop-off during the
    larger recruitment trial led me to pause data collection as I moved into my
    next role. Data cleaning and final analysis still remain.
  </p>
</template>

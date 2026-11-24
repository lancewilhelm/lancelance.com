<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>For my CS6242 Data Visualization and Analytics final project at Georgia Tech, our team built a React dashboard that lets you search a political topic and compare how different political subreddits talk about it side by side. Instead of reading one feed at a time, you can search a keyword and see each subreddit's weighted sentiment, vote differentials, top comments, related keywords, and linked news articles.</p>
  <ProseHeading id="how-it-works" :level="2">How It Works</ProseHeading>
  <p>We pulled Reddit posts and comments from opposing political subreddits through the Pushshift API and stored them in PostgreSQL. By April 15, 2021, the test database held roughly <strong>1.5 million posts</strong> and <strong>20.7 million comments</strong> (111 columns each), with a scheduled fetcher pulling in new data daily.</p>
  <p>Our Python pipeline normalized the text with spaCy, extracted searchable noun topics via Named Entity Recognition (NER), and scored comment sentiment with a pretrained BERT model to compute a weighted average sentiment per subreddit for each keyword. Everything on the backend—PostgreSQL, fetcher, scheduler, cleaner, NLP pipeline, and webhook—ran in Docker, serving a React frontend with both summary and detail views (Figure 1).</p>
  <BlogImage eager image-path="/img/reddit-politics/team009poster.jpg" alt="Political discourse analysis application interface" caption="Figure 1. Application user interface" width="640px" />
  <ProseHeading id="experiments-and-evaluation" :level="2">Experiments and Evaluation</ProseHeading>
  <p>We planned six sets of sanity checks and evaluations. Getting the NLP pipeline right ate up most of our schedule, so we finished the core technical checks and informal user testing but ran out of time for public Reddit rollout.</p>
  <ProseHeading id="1-backend-nlp-pipeline" :level="3">1. Backend &amp; NLP pipeline</ProseHeading>
  <ul>
    <li><strong>Daily ingestion:</strong> Spot-checking live threads against PostgreSQL showed no data loss, though we had to patch the fetcher to skip useless <code>[removed]</code> records. We also found that up to ~30% of captured comment permalinks expired quickly, leaving dead <code>"Go to comment"</code> links in the UI.</li>
    <li><strong>NER &amp; sentiment accuracy:</strong> Our first pipeline completely whiffed—missing named entities and outputting all zeros for sentiment—mostly due to text parsing bugs and a pretraining dataset built around restaurant reviews that didn't transfer to politics at all. After rewriting the scripts and switching to a more general pretrained model, manual checks across ~100 comments put accuracy around <strong>85%</strong> (beating our 80% target).</li>
  </ul>
  <ProseHeading id="2-frontend-latency" :level="3">2. Frontend &amp; latency</ProseHeading>
  <ul>
    <li><strong>UI rendering:</strong> Comparing 20+ frontend renders directly against backend JSON payloads matched 100%, with a few minor quirks left over (like the Enter key not submitting topic searches).</li>
    <li><strong>Query speed:</strong> Our goal of <code>&lt;1s</code> search latency wasn't realistic on unindexed first-time queries across 20M+ comments—fresh searches could take 60+ seconds. Caching repeat same-day searches in the database helped, but real responsiveness would require precomputing outputs for all extracted entities right after each daily fetch (and figuring out how to handle multi-term or exclusionary queries like <code>"Waters -Chauvin"</code>).</li>
  </ul>
  <ProseHeading id="3-user-feedback" :level="3">3. User feedback</ProseHeading>
  <ul>
    <li>We demoed the dashboard to <strong>58 friends and family</strong> to collect informal reactions. About 70% said they'd use it again (with obvious friend-and-family bias), and their main complaints were dead-on: slow first-time queries, awkward access, occasional counterintuitive sentiment scores (like <code>r/Republican</code> appearing to "disapprove" of a border wall), and wanting news links surfaced more prominently.</li>
    <li>We looked into public hosting and posting to the target subreddits for tougher, less-biased feedback, but processing costs for the data pipeline and semester deadlines cut both short.</li>
  </ul>
  <ProseHeading id="4-sanity-checks-controversy-divergence-relevance" :level="3">4. Sanity checks (controversy, divergence, relevance)</ProseHeading>
  <ul>
    <li><strong>Controversy check (<code>Trump</code>, <code>Biden</code>, <code>COVID</code>):</strong> Subreddit scores lined up with manual inspection—strongly negative communities scored <code>-0.7</code> or lower, strongly positive <code>+0.7</code> or higher, and neutral communities landed between <code>-0.3</code> and <code>+0.3</code>.</li>
    <li><strong>Divergence check (<code>president</code>, <code>China</code>, <code>Biden</code>):</strong> Expected partisan splits showed up cleanly (<code>Biden</code> positive in <code>r/Democrats</code>, negative in <code>r/Republican</code>), while <code>r/Libertarian</code> showed the widest internal spread and averaged closer to neutral (<code>-0.5</code> to <code>+0.5</code>).</li>
    <li><strong>Relevance check:</strong> Restricting extracted topics to nouns eliminated stopword junk (<code>"and"</code>, <code>"the"</code>), though compound terms (<code>"border wall"</code>) and ambiguous names (<code>"Georgia"</code>, <code>"pipeline"</code>) still caused occasional conflation.</li>
  </ul>
  <ProseHeading id="what-id-do-differently" :level="2">What I'd Do Differently</ProseHeading>
  <p>Getting 20M+ comments flowing from Pushshift through BERT into a working React UI was a fun end-to-end build, and the biggest bottlenecks were all practical engineering ones: precomputing entity aggregates offline so searches feel instant, validating comment links before rendering them, and handling multi-word entities so <code>"border wall"</code> isn't split into <code>"border"</code> and <code>"wall"</code>.</p>
  <ProseHeading id="poster" :level="2">Poster</ProseHeading>
  <BlogImage image-path="/img/reddit-politics/team009posterposter.jpg" alt="Poster presenting the political discourse analysis project" width="700px" />
</template>

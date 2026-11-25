<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>For my final project in CS6242 (Data Visualization and Analytics) at Georgia Tech, our team built a React dashboard that lets you search a political topic and compare how different subreddits discuss it side by side. Instead of reading one feed at a time, you can search a keyword and see each subreddit's weighted sentiment, vote differentials, top comments, related keywords, and linked news articles.</p>
  <ProseHeading id="how-it-works" :level="2">How It Works</ProseHeading>
  <p>We pulled Reddit posts and comments from opposing political subreddits through the Pushshift API and stored them in PostgreSQL. By April 15, 2021, the test database held roughly <strong>1.5 million posts</strong> and <strong>20.7 million comments</strong> (111 columns each), with a scheduled fetcher pulling in new data daily.</p>
  <p>Our Python pipeline normalized the text with spaCy, extracted searchable noun topics via Named Entity Recognition (NER), and scored comment sentiment with a pretrained BERT model to compute a weighted average sentiment per subreddit for each keyword. Every backend service ran in Docker, including PostgreSQL, the fetcher, the scheduler, the cleaner, the NLP pipeline, and a webhook. Together, they served a React frontend with both summary and detail views (Figure 1).</p>
  <BlogImage eager image-path="/img/reddit-politics/team009poster.jpg" alt="Political discourse analysis application interface" caption="Figure 1. Application user interface" width="640px" />
  <ProseHeading id="experiments-and-evaluation" :level="2">Experiments and Evaluation</ProseHeading>
  <p>We planned six sets of sanity checks and evaluations. Getting the NLP pipeline right took most of our schedule, so we completed the core technical checks and informal user testing but ran out of time for a public release on Reddit.</p>
  <ProseHeading id="1-backend-nlp-pipeline" :level="3">1. Backend &amp; NLP pipeline</ProseHeading>
  <ul>
    <li><strong>Daily ingestion:</strong> Spot-checking live threads against PostgreSQL showed no data loss, though we had to patch the fetcher to skip <code>[removed]</code> records. We also found that up to ~30% of captured comment permalinks expired quickly, leaving dead <code>"Go to comment"</code> links in the UI.</li>
    <li><strong>NER &amp; sentiment accuracy:</strong> Our first pipeline failed badly, missing named entities and outputting all zeros for sentiment. That happened because of bugs in our text parser and a pretraining dataset built on restaurant reviews that did not transfer to political discussion. After rewriting the scripts and switching to a more general pretrained model, manual checks across ~100 comments put accuracy around <strong>85%</strong> (beating our 80% target).</li>
  </ul>
  <ProseHeading id="2-frontend-latency" :level="3">2. Frontend &amp; latency</ProseHeading>
  <ul>
    <li><strong>UI rendering:</strong> Comparing 20+ frontend renders directly against backend JSON payloads matched 100%, with a few minor quirks left over (such as the Enter key not submitting topic searches).</li>
    <li><strong>Query speed:</strong> Our goal of under <code>1s</code> for search latency was not realistic for unindexed queries across more than 20 million comments, and first-time searches could take over 60 seconds. Caching repeated searches from the same day in the database helped. Real responsiveness would require precomputing results for all extracted entities right after each daily fetch, along with support for multi-term or exclusionary queries like <code>"Waters -Chauvin"</code>.</li>
  </ul>
  <ProseHeading id="3-user-feedback" :level="3">3. User feedback</ProseHeading>
  <ul>
    <li>We demonstrated the dashboard to <strong>58 friends and family</strong> to gather informal feedback. About 70% said that they would use it again, though that figure reflects obvious bias from friends and family. Their main complaints were accurate: slow first-time queries, awkward access, occasional counterintuitive sentiment scores (such as <code>r/Republican</code> appearing to "disapprove" of a border wall), and news links that needed more prominent placement.</li>
    <li>We looked into public hosting and posting to the target subreddits for tougher, less-biased feedback, but processing costs for the data pipeline and semester deadlines prevented both.</li>
  </ul>
  <ProseHeading id="4-sanity-checks-controversy-divergence-relevance" :level="3">4. Sanity checks (controversy, divergence, relevance)</ProseHeading>
  <ul>
    <li><strong>Controversy check (<code>Trump</code>, <code>Biden</code>, <code>COVID</code>):</strong> Subreddit scores matched our manual checks: strongly negative communities scored <code>-0.7</code> or lower, strongly positive communities scored <code>+0.7</code> or higher, and neutral communities landed between <code>-0.3</code> and <code>+0.3</code>.</li>
    <li><strong>Divergence check (<code>president</code>, <code>China</code>, <code>Biden</code>):</strong> The results showed the expected partisan splits (<code>Biden</code> positive in <code>r/Democrats</code>, negative in <code>r/Republican</code>), while <code>r/Libertarian</code> showed the widest internal spread and averaged closer to neutral (<code>-0.5</code> to <code>+0.5</code>).</li>
    <li><strong>Relevance check:</strong> Restricting extracted topics to nouns eliminated stopword junk (<code>"and"</code>, <code>"the"</code>), though compound terms (<code>"border wall"</code>) and ambiguous names (<code>"Georgia"</code>, <code>"pipeline"</code>) still caused occasional conflation.</li>
  </ul>
  <ProseHeading id="what-id-do-differently" :level="2">What I'd Do Differently</ProseHeading>
  <p>Getting 20M+ comments from Pushshift through BERT and into a working React UI was a fun end-to-end build. The biggest bottlenecks were all practical engineering issues: precomputing entity aggregates offline so that searches feel instant, validating comment links before rendering them, and handling multi-word entities so that <code>"border wall"</code> is not split into <code>"border"</code> and <code>"wall"</code>.</p>
  <ProseHeading id="poster" :level="2">Poster</ProseHeading>
  <BlogImage image-path="/img/reddit-politics/team009posterposter.jpg" alt="Poster presenting the political discourse analysis project" width="700px" />
</template>

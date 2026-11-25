<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    AI Ledger is a self-hosted logger for AI usage, raw transcript archive, and
    monitoring dashboard for my coding sessions. I built it so that every
    conversation, thinking block, tool call, and token count from my macOS and
    Linux machines is saved in one local database without proxying or modifying
    API traffic to providers.
  </p>
  <BlogImage
    eager
    image-path="/img/ai-ledger/dashboard-overview.png"
    alt="AI Ledger overview dashboard showing token breakdown, cache hit rate, estimated cost, stacked usage over time by harness, and a breakdown table"
    caption="Overview dashboard with stacked token metrics, custom date windows, and harness breakdowns"
    width="780px"
  />
  <ProseHeading id="how-it-works" :level="2">How It Works</ProseHeading>
  <p>
    Instead of intercepting requests, a lightweight background collector
    (<code>ai-ledger-collector</code>) monitors the local session logs that AI
    harnesses already write to disk. It supports Claude Code, Codex,
    Antigravity, T3 Code, and Hermes Agent, and it uploads incremental chunks
    over LAN or Tailscale to a single self-hosted server
    (<code>ai-ledger-server</code>).
  </p>
  <ul>
    <li>
      <strong>Lossless archive first:</strong> Every byte from every device is
      written untouched to disk, and overwritten snapshots are versioned
      automatically. The SQLite index can be rebuilt completely from the archive
      at any time with <code>ai-ledger-server reparse</code>.
    </li>
    <li>
      <strong>Fast, compact SQLite snapshots:</strong> For tools that store
      state in SQLite, the collector creates WAL-safe online snapshots and
      compresses them with deterministic Zstd. For T3 Code, it extracts only the
      24 tables for metadata and orchestration rather than redundant UI
      projections, shrinking a ~990 MB local database to ~1.5 MB in under 100
      ms.
    </li>
    <li>
      <strong>Single static binaries and minimal Docker image:</strong> Both the
      server and collector compile as <code>CGO_ENABLED=0</code> static Go
      binaries using pure-Go SQLite (<code>modernc.org/sqlite</code>) with FTS5.
      The server embeds the React + Vite dashboard, versioned SQL migrations,
      and timezone data into an ~18 MB multi-arch <code>FROM scratch</code>
      container image.
    </li>
  </ul>
  <ProseHeading id="sessions-and-search" :level="2"
    >Sessions, Inspector, and Full-Text Search</ProseHeading
  >
  <p>
    You can filter sessions by preset or custom date ranges, harness, model,
    device, and project. Date filters match sessions by their last activity so
    that resumed multi-day threads still appear. Opening a session displays the
    full conversation, collapsible reasoning and thinking blocks, paired tool
    inputs and outputs, and telemetry for token counts and rate limits on each
    call. You can also download the raw log file or export redacted JSONL for
    training and analysis.
  </p>
  <BlogImage
    image-path="/img/ai-ledger/session-inspector.png"
    alt="AI Ledger session inspector drawer showing session metadata, token stats, expanded thinking block, and paired Bash tool call input"
    caption="Session inspector showing metadata, expanded thinking, and paired tool call input and output"
    width="780px"
  />
  <ProseHeading id="pricing-transparency" :level="2"
    >Transparent Model Pricing &amp; Overrides</ProseHeading
  >
  <p>
    Token costs are calculated separately for uncached input, discounted cache
    reads, 5-minute and 1-hour cache writes, and output tokens so that cache
    hits are priced accurately and never double-counted. A dedicated
    <strong>Settings</strong> view shows where each model's rate comes from in
    priority order: manual overrides, a custom rates file, synced T3 or LiteLLM
    rates, or built-in defaults. From that view, you can override the rate per
    million tokens for any model and recalculate historical costs right away.
  </p>
  <BlogImage
    image-path="/img/ai-ledger/pricing-settings.png"
    alt="AI Ledger settings page displaying the cost calculation precedence stack and observed model rates per million tokens with override buttons"
    caption="Settings page showing pricing sources in priority order, rates per million tokens, and manual overrides"
    width="780px"
  />
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/ai-ledger" />
</template>

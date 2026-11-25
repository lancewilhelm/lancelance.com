<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>
    AI Ledger is a self-hosted usage logger, raw transcript archive, and
    monitoring dashboard for personal AI coding sessions. I built it so that
    every conversation, thinking block, tool call, and token count from my
    macOS and Linux machines lands in one local database without proxying or
    modifying provider API traffic.
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
    (<code>ai-ledger-collector</code>) watches the local session logs that AI
    harnesses already write to disk—including Claude Code, Codex, Antigravity,
    T3 Code, and Hermes Agent—and uploads incremental chunks over LAN or
    Tailscale to a single self-hosted server (<code>ai-ledger-server</code>).
  </p>
  <ul>
    <li>
      <strong>Lossless raw archive first:</strong> Every byte from every
      device is written untouched to disk, and overwritten snapshots are
      versioned automatically. The SQLite index can be rebuilt completely from
      the archive at any time with <code>ai-ledger-server reparse</code>.
    </li>
    <li>
      <strong>Fast, compact SQLite snapshots:</strong> For tools that store
      state in SQLite, the collector creates WAL-safe online snapshots and
      compresses them with deterministic Zstd. For T3 Code, it extracts only the
      24 unique metadata and orchestration tables rather than redundant UI
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
    Sessions can be filtered by preset or custom calendar date ranges, harness,
    model, device, and project, and date filters match sessions based on when
    they were last active so that resumed multi-day threads still appear.
    Opening any session reveals the full conversation, collapsible reasoning and
    thinking blocks, paired tool inputs and outputs, per-call token and rate
    limit telemetry, raw file download, and redacted JSONL export for training
    or analysis.
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
    Token costs are calculated separately across uncached input, discounted
    cache reads, 5-minute and 1-hour cache writes, and output tokens so that
    cache hits are priced accurately and never double-counted. A dedicated
    <strong>Settings</strong> view surfaces where every model's rate comes from
    in priority order—manual overrides, a custom rates file, synced T3 /
    LiteLLM rates, or built-in defaults—and lets you override any model's
    per-million-token pricing and recalculate historical costs immediately.
  </p>
  <BlogImage
    image-path="/img/ai-ledger/pricing-settings.png"
    alt="AI Ledger settings page displaying the cost calculation precedence stack and observed model rates per million tokens with override buttons"
    caption="Settings page showing pricing source precedence, per-million-token rates, and manual overrides"
    width="780px"
  />
  <ProseHeading id="github-repo" :level="2">GitHub Repo</ProseHeading>
  <GithubRepoCard repo="lancewilhelm/ai-ledger" />
</template>

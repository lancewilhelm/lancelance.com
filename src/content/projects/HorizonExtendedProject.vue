<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import GithubRepoCard from "@/components/GithubRepoCard.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <p><strong>A necessary update to a great theme.</strong></p>
  <p>I love the color palette and warm tone of <a href="https://marketplace.visualstudio.com/items?itemName=jolaleye.horizon-theme-vscode" target="_blank" rel="noopener noreferrer">jolaleye's original Horizon theme</a>, but it stopped getting updates and was missing semantic highlighting and a few modern UI touches. Horizon Extended started as my personal remix for VS Code, and I eventually ported it to every editor and terminal that I use.</p>
  <p>Recommended fonts: Fira Code (with ligatures enabled) or Zed Plex Mono.</p>
  <p>The VS Code extension includes a refined dark theme with a more consistent palette and a minimal border-driven UI. It also preserves the original dark styles as alternates and adds a light theme built from the same highlighting colors. Fair warning: the light theme is VERY colorful. If you are not ready to taste the rainbow, stay away from the light theme.</p>
  <p>At the time that I first wrote this up, the VS Code extension had already passed 14,000 downloads—thank you to everyone using it! <a href="https://marketplace.visualstudio.com/items?itemName=LanceWilhelm.horizon-extended" target="_blank" rel="noopener noreferrer">Horizon Extended on Visual Studio Marketplace</a></p>
  <BlogImage eager image-path="/img/horizon-extended/jsxshot.png" alt="JavaScript code in the Horizon Extended dark theme" caption="VS Code — Dark mode" width="800px" />
  <BlogImage image-path="/img/horizon-extended/lightjsx.png" alt="JavaScript code in the Horizon Extended light theme" caption="VS Code — Light mode" width="800px" />
  <ProseHeading id="beyond-vs-code" :level="2">Beyond VS Code</ProseHeading>
  <p>As I started switching between editors and terminal setups, I ported the same palette over so that everything stays consistent:</p>
  <ul>
    <li><strong>Neovim</strong> (<a href="https://github.com/lancewilhelm/horizon-extended.nvim" target="_blank" rel="noopener noreferrer"><code>horizon-extended.nvim</code></a>) — Lua port with Tree-sitter, LSP semantic highlighting, common plugin support, and three styles (<code>neo</code>, <code>beam</code>, and <code>ray</code>).</li>
    <li><strong>Zed</strong> (<a href="https://github.com/lancewilhelm/horizon-extended.zed" target="_blank" rel="noopener noreferrer"><code>horizon-extended.zed</code></a>) — Theme extension that brings the same dark and light styles to Zed.</li>
    <li><strong>Terminal &amp; multiplexer</strong> — Matching configs for <a href="https://github.com/lancewilhelm/horizon-extended.kitty" target="_blank" rel="noopener noreferrer">Kitty</a> and <a href="https://github.com/lancewilhelm/horizon-extended.tmux" target="_blank" rel="noopener noreferrer">tmux</a>.</li>
  </ul>
  <BlogImage image-path="/img/horizon-extended/nvim-teaser.png" alt="Horizon Extended theme preview in Neovim" caption="Horizon Extended in Neovim (neo, beam, and ray styles)" width="800px" />
  <GithubRepoCard repo="lancewilhelm/horizon-extended" />
  <GithubRepoCard repo="lancewilhelm/horizon-extended.nvim" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import dockerfile from "highlight.js/lib/languages/dockerfile";
for (const [name, language] of Object.entries({
  bash,
  xml,
  css,
  python,
  javascript,
  json,
  yaml,
  dockerfile,
}))
  hljs.registerLanguage(name, language);

interface Props {
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: Array<number> | null;
  meta?: string | null;
  class?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  code: "",
  language: null,
  filename: null,
  highlights: null,
  meta: null,
  class: null,
});

const copyStatus = ref("");

const parsedCode = computed(() => {
  const lang = props.language?.toLowerCase() || "";
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(props.code, { language: lang }).value;
  }
  return hljs.highlightAuto(props.code).value;
});

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code);
    copyStatus.value = "copied!";
  } catch {
    copyStatus.value = "copy failed";
  }
}
</script>

<template>
  <div class="flex flex-col my-[10px] sm:m-[10px]">
    <div
      class="grid grid-cols-[min-content_max-content_auto_min-content] text-sm font-mono"
    >
      <div
        v-if="language"
        :class="[
          'bg-(--main-color) text-(--bg-color) p-[5px] rounded-tl-(--border-radius) col-start-1 italic',
          !filename ? 'rounded-tr-lg' : '',
        ]"
      >
        {{ language }}
      </div>
      <div
        v-if="filename"
        class="bg-(--sub-color) text-(--fg-color) p-[5px] rounded-tr-(--border-radius) col-start-2"
      >
        {{ filename }}
      </div>
      <button
        type="button"
        class="bg-(--main-color) text-(--bg-color) p-[5px] rounded-t-(--border-radius) col-start-4 cursor-pointer hover:bg-(--sub-color) transition-all duration-300 copy-code-btn"
        @click="copyCode"
      >
        {{ copyStatus || "copy" }}
      </button>
    </div>
    <pre
      :class="[
        'rounded-b shadow',
        language ? `language-${language}` : 'rounded-tl',
      ]"
    >
            <code class="hljs" v-html="parsedCode"></code>
        </pre>
  </div>
</template>

<style>
pre {
  padding: 10px;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  overflow-x: auto;
}
</style>

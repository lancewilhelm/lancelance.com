<script setup lang="ts">
import { computed } from "vue";
import katex from "katex";

const props = withDefaults(
  defineProps<{
    expr: string;
    display?: boolean;
  }>(),
  {
    display: false,
  },
);

const rendered = computed(() =>
  katex.renderToString(props.expr, {
    displayMode: props.display,
    output: "mathml",
    throwOnError: false,
  }),
);
</script>

<template>
  <div v-if="display" class="katex-display text-center" v-html="rendered" />
  <span v-else v-html="rendered" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    level?: 2 | 3 | 4;
    id?: string;
  }>(),
  {
    level: 2,
  },
);

const tag = computed(() => `h${props.level}`);
const status = ref("");

async function copyHeaderLink(id: string) {
  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}#${id}`,
    );
    status.value = "Link copied";
  } catch {
    status.value = "Could not copy link";
  }
}
</script>

<template>
  <div :id="id" class="flex items-center gap-2">
    <component :is="tag"><slot /></component>
    <button
      v-if="id"
      type="button"
      class="cursor-pointer flex shrink min-w-6 min-h-6 items-center justify-center text-(--main-color)"
      :aria-label="status || 'Copy link to heading'"
      @click="copyHeaderLink(id)"
    >
      <svg
        v-if="status === 'Link copied'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M7 10v12" />
        <path
          d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </button>
    <span class="sr-only" role="status">{{ status }}</span>
  </div>
</template>

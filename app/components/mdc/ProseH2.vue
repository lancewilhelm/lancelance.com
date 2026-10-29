<script setup lang="ts">
defineProps<{ id?: string }>();
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
    <h2><slot /></h2>
    <button
      v-if="id"
      type="button"
      class="cursor-pointer flex flex-shrink min-w-6 min-h-6 items-center justify-center"
      :aria-label="status || 'Copy link to heading'"
      @click="copyHeaderLink(id)"
    >
      <Icon
        :name="status === 'Link copied' ? 'lucide:thumbs-up' : 'lucide:link'"
        class="text-(--main-color)"
      />
    </button>
    <span class="sr-only" role="status">{{ status }}</span>
  </div>
</template>

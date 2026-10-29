<script setup lang="ts">
defineProps<{ imagePath: string; alt: string }>();
const emit = defineEmits<{ close: [] }>();
const dialog = ref<HTMLDialogElement | null>(null);
onMounted(() => dialog.value?.showModal());
function backdrop(event: MouseEvent) {
  const element = dialog.value;
  if (!element || event.target !== element) return;
  const bounds = element.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    element.close();
}
</script>
<template>
  <dialog
    ref="dialog"
    aria-label="Enlarged image"
    class="zoom-dialog bg-transparent p-5 max-w-full max-h-full"
    @close="emit('close')"
    @click="backdrop"
  >
    <button
      type="button"
      class="block ml-auto mb-2 px-3 py-1 bg-(--bg-color) text-(--text-color) rounded cursor-pointer"
      @click="dialog?.close()"
    >
      Close
    </button>
    <img
      :src="imagePath"
      :alt="alt"
      class="cursor-pointer max-h-[85dvh] max-w-full"
      @click="dialog?.close()"
    />
  </dialog>
</template>
<style scoped>
.zoom-dialog {
  margin: auto;
}
.zoom-dialog::backdrop {
  background: rgb(0 0 0 / 60%);
}
</style>

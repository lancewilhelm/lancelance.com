<script setup lang="ts">
const emit = defineEmits<{ close: [] }>();
const dialog = ref<HTMLDialogElement | null>(null);
const themes = ref<readonly ThemeOption[]>([]);
const selected = ref("paper");
onMounted(() => {
  themes.value = [...window.themeRuntime.themes].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  selected.value = window.themeRuntime.current();
  dialog.value?.showModal();
});
function select(name: string) {
  window.themeRuntime.select(name);
  selected.value = window.themeRuntime.current();
}
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
    aria-labelledby="theme-picker-title"
    class="theme-dialog bg-(--bg-color) text-(--text-color) border-3 border-(--main-color) rounded-lg w-72 sm:w-96 max-h-[75dvh] p-2"
    @close="emit('close')"
    @click="backdrop"
  >
    <div class="flex justify-between items-center gap-2 px-2">
      <h2 id="theme-picker-title" class="text-base font-bold">Choose theme</h2>
      <button type="button" class="cursor-pointer" @click="dialog?.close()">
        Close
      </button>
    </div>
    <div class="grid gap-1" role="group" aria-label="Themes">
      <button
        v-for="theme in themes"
        :key="theme.name"
        type="button"
        :class="[
          'grid grid-cols-[1fr_auto] text-left items-center cursor-pointer px-2',
          { 'border-y-3 border-(--main-color)': selected === theme.name },
        ]"
        :aria-pressed="selected === theme.name"
        @click="select(theme.name)"
      >
        <span class="text-sm font-bold font-mono">{{ theme.name }}</span>
        <span
          class="grid grid-cols-3 gap-1 items-center p-2 rounded-full"
          :style="{ backgroundColor: theme.bgColor }"
          aria-hidden="true"
        >
          <span
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: theme.mainColor }"
          />
          <span
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: theme.subColor }"
          />
          <span
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: theme.textColor }"
          />
        </span>
      </button>
    </div>
  </dialog>
</template>
<style scoped>
.theme-dialog {
  margin: auto;
}
.theme-dialog::backdrop {
  background: rgb(0 0 0 / 60%);
}
</style>

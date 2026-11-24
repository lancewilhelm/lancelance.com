<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const SYSTEM = "system";

const emit = defineEmits<{ close: [] }>();
const dialog = ref<HTMLDialogElement | null>(null);
const themes = ref<readonly ThemeOption[]>([]);
const selected = ref(SYSTEM);
const current = ref("");
const systemThemes = ref<{ light?: ThemeOption; dark?: ThemeOption }>({});

const systemSwatch = computed(() => {
  const { light, dark } = systemThemes.value;
  if (!light || !dark) return {};
  return {
    background: `linear-gradient(90deg, ${light.bgColor} 50%, ${dark.bgColor} 50%)`,
  };
});

function syncSelection() {
  selected.value = window.themeRuntime.preference();
  current.value = window.themeRuntime.current();
}

onMounted(() => {
  const runtime = window.themeRuntime;
  themes.value = [...runtime.themes].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const byName = (name: string) =>
    runtime.themes.find((theme) => theme.name === name);
  systemThemes.value = {
    light: byName(runtime.systemThemes.light),
    dark: byName(runtime.systemThemes.dark),
  };
  syncSelection();
  window.addEventListener("themechange", syncSelection);
  dialog.value?.showModal();
});

onBeforeUnmount(() => window.removeEventListener("themechange", syncSelection));

function select(name: string) {
  window.themeRuntime.select(name);
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
  ) {
    element.close();
  }
}
</script>

<template>
  <dialog
    ref="dialog"
    aria-label="Choose theme"
    class="theme-dialog bg-(--bg-color) text-(--text-color) border-3 border-(--main-color) rounded-lg w-72 sm:w-96 max-h-[75dvh] p-2"
    @close="emit('close')"
    @click="backdrop"
  >
    <div class="grid gap-1" role="group" aria-label="Themes">
      <button
        type="button"
        :class="[
          'theme-option grid grid-cols-[1fr_auto] text-left items-center cursor-pointer px-2',
          { 'is-selected': selected === SYSTEM },
        ]"
        :aria-pressed="selected === SYSTEM"
        @click="select(SYSTEM)"
      >
        <span class="theme-name text-sm font-bold font-mono">
          system
          <span
            v-if="selected === SYSTEM"
            class="font-normal text-(--sub-text-color)"
            aria-hidden="true"
            >({{ current }})</span
          >
        </span>
        <span
          class="theme-swatch grid grid-cols-3 gap-1 items-center p-2 rounded-full"
          :style="systemSwatch"
          aria-hidden="true"
        >
          <span
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: systemThemes.light?.mainColor }"
          />
          <span class="w-4 h-4" />
          <span
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: systemThemes.dark?.mainColor }"
          />
        </span>
      </button>
      <hr class="border-(--sub-color) my-1 mx-2" />
      <button
        v-for="theme in themes"
        :key="theme.name"
        type="button"
        :class="[
          'theme-option grid grid-cols-[1fr_auto] text-left items-center cursor-pointer px-2',
          { 'is-selected': selected === theme.name },
        ]"
        :aria-pressed="selected === theme.name"
        @click="select(theme.name)"
      >
        <span class="theme-name text-sm font-bold font-mono">{{
          theme.name
        }}</span>
        <span
          class="theme-swatch grid grid-cols-3 gap-1 items-center p-2 rounded-full"
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
/* Selection, hover and focus are all drawn with backgrounds and inset
   shadows so the row geometry never changes. */
.theme-option {
  border-radius: 8px;
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}
.theme-option .theme-name {
  transition: color 0.15s ease;
}
.theme-option:hover {
  background-color: color-mix(in srgb, var(--text-color) 6%, transparent);
}
.theme-option:focus-visible {
  outline: 2px solid var(--main-color);
  outline-offset: -2px;
}
.theme-option.is-selected {
  border-radius: 0 8px 8px 0;
  background-color: color-mix(in srgb, var(--main-color) 9%, transparent);
  box-shadow: inset 3px 0 0 var(--main-color);
}
.theme-option.is-selected:hover {
  background-color: color-mix(in srgb, var(--main-color) 14%, transparent);
}
.theme-option.is-selected .theme-name {
  color: var(--main-color);
}
@media (prefers-reduced-motion: reduce) {
  .theme-option,
  .theme-option .theme-name {
    transition: none;
  }
}
</style>

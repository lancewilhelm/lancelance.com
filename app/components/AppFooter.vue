<script setup>
const showThemePicker = ref(false);
</script>

<template>
  <footer
    class="flex row-start-[content-end] col-start-[content-start] justify-center items-center"
  >
    <div class="flex gap-2 items-center">
      <button
        type="button"
        aria-label="Choose theme"
        class="cursor-pointer flex items-center"
        @click="showThemePicker = true"
      >
        <Icon name="fa6-solid:palette" class="text-(--sub-text-color)" />
      </button>
      <NuxtLink
        class="flex items-center"
        to="https://github.com/lancewilhelm"
        aria-label="GitHub profile"
      >
        <Icon name="simple-icons:github" class="text-(--sub-text-color)" />
      </NuxtLink>
    </div>
    <ThemePicker v-if="showThemePicker" @close="showThemePicker = false" />
  </footer>
</template>

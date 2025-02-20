<script setup>
const showThemePicker = ref(false);
</script>

<template>
  <footer class='flex row-start-[content-end] col-start-[content-start] justify-center items-center'>
    <div class="cursor-pointer" @click="showThemePicker = true">
      <Icon name="fa6-solid:palette" class="text-(--sub-color)" />
    </div>
    <ThemePicker v-if="showThemePicker" @close="showThemePicker = false" />
  </footer>
</template>

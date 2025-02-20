<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class='app-content'>
    <div class="row-start-[header-start] col-start-[content-start] flex flex-col items-center">
      <Header :route="route" />
    </div>
    <div class='content'>
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.app-content {
  width: 100vw;
  height: 100dvh;
  display: grid;
  grid-template-rows: [gutter-start] 40px [header-start] min-content [content-start] 1fr [content-end] 40px [gutter-end];
  grid-template-columns: [header-start] 40px [content-start] 1fr [content-end] 40px [footer-end];
}

.content {
  width: 100%;
  height: 100%;
  grid-column: content-start / content-end;
  grid-row: content-start / content-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

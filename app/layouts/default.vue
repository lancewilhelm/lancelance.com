<template>
  <div class='app-content'>
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
  grid-template-columns: [gutter-start] 40px [content-start] 1fr [content-end] 40px [gutter-end];
  grid-template-rows: [header-start] 40px [content-start] 1fr [content-end] 40px [footer-end];
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

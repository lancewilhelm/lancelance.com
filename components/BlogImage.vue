<script setup lang="ts">
defineProps({
  imagePath: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
})

const zoomed = ref(false)
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-2 my-[10px]">
    <div :style="[width ? 'width:' + width : '', height ? 'height:' + height : '']">
      <img :src="imagePath" class="w-full cursor-pointer" @click="zoomed = true">
    </div>
    <div class='italic max-w-[80vw]'>
      <slot name="caption" />
      {{ caption }}
    </div>
    <ImageZoom v-if="zoomed" @close="zoomed = false" :image-path="imagePath" />
  </div>
</template>

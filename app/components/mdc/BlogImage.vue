<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    imagePath?: string;
    caption?: string;
    alt?: string;
    link?: string;
    width?: string;
    height?: string;
    eager?: boolean;
  }>(),
  {
    imagePath: "",
    caption: "",
    alt: "",
    link: "",
    width: "",
    height: "",
    eager: false,
  },
);
const resolvedAlt = computed(
  () => props.alt || props.caption || "Article image",
);
const zoomed = ref(false);
</script>
<template>
  <div class="flex flex-col justify-center items-center gap-2 my-[10px]">
    <div
      :style="[width ? 'width:' + width : '', height ? 'height:' + height : '']"
      class="max-w-full"
    >
      <a
        v-if="link"
        :href="link"
        :aria-label="resolvedAlt"
        target="_blank"
        rel="noopener"
      >
        <ResponsiveImage
          :src="imagePath"
          :alt="resolvedAlt"
          :eager="eager"
          class="w-full"
        />
      </a>
      <button
        v-else
        type="button"
        class="block cursor-pointer"
        :aria-label="`Enlarge image: ${resolvedAlt}`"
        @click="zoomed = true"
      >
        <ResponsiveImage
          :src="imagePath"
          :alt="resolvedAlt"
          :eager="eager"
          class="w-full"
        />
      </button>
    </div>
    <div class="italic max-w-[80vw] text-center">
      <slot name="caption" />{{ caption }}
    </div>
    <ImageZoom
      v-if="zoomed"
      :image-path="imagePath"
      :alt="resolvedAlt"
      @close="zoomed = false"
    />
  </div>
</template>

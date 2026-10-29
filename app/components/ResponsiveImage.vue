<script setup lang="ts">
import images from "~/assets/generated-images.json";

const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    eager?: boolean;
    sizes?: string;
  }>(),
  {
    eager: false,
    sizes: "100vw",
  },
);

const catalog: Record<
  string,
  {
    width: number;
    height: number;
    renditions: { src: string; width: number }[];
  }
> = images;
const image = computed(() => catalog[props.src]);
const srcset = computed(
  () =>
    image.value?.renditions
      .map((rendition) => `${rendition.src} ${rendition.width}w`)
      .join(", ") || undefined,
);
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="image?.width"
    :height="image?.height"
    :srcset="srcset"
    :sizes="srcset ? sizes : undefined"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
  />
</template>

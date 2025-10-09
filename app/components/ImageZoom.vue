<script setup lang="ts">
defineProps({
  imagePath: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['close']);

const zoomed = ref(false)

// Event handlers
document.addEventListener('mousedown', handleClickOutsideZoom);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    emit('close');
  }
});

/**
 * Zooms in on the image by opening it up in a model
 */
function zoomImage() {
  zoomed.value = true
}

/**
 * Closes the window when clicking outside of the image
 */
function handleClickOutsideZoom(event) {
  if (event.target.id === 'zoomed-modal' || event.target.id === 'zoomed-image') {
    emit('close');
  }
};
</script>

<template>
  <div id="zoomed-modal"
    class="fixed grid items-center justify-center z-10 left-0 top-0 w-full h-full overflow-auto bg-black/60 p-[20px]">
    <img :src="imagePath" id="zoomed-image" class="cursor-pointer">
  </div>
</template>

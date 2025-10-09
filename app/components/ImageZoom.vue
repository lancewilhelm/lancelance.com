<script setup lang="ts">
defineProps({
    imagePath: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["close"]);

// Event handlers
document.addEventListener("mousedown", handleClickOutsideZoom);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        emit("close");
    }
});

// /**
//  * Zooms in on the image by opening it up in a model
//  */
// const zoomed = ref(false);
// function zoomImage() {
//     zoomed.value = true;
// }

/**
 * Closes the window when clicking outside of the image
 */
function handleClickOutsideZoom(event: MouseEvent) {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    if (target.id === "zoomed-modal" || target.id === "zoomed-image") {
        emit("close");
    }
}
</script>

<template>
    <div
        id="zoomed-modal"
        class="fixed grid items-center justify-center z-10 left-0 top-0 w-full h-full overflow-auto bg-black/60 p-[20px]"
    >
        <img id="zoomed-image" :src="imagePath" class="cursor-pointer" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
    imagePath: {
        type: String,
        default: "",
    },
    caption: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
    width: {
        type: String,
        default: "",
    },
    height: {
        type: String,
        default: "",
    },
});

const zoomed = ref(false);
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-2 my-[10px]">
        <div
            :style="[
                width ? 'width:' + width : '',
                height ? 'height:' + height : '',
            ]"
            class="max-w-full"
        >
            <a v-if="link" :href="link" target="_blank" rel="noopener">
                <img :src="imagePath" class="w-full cursor-pointer" />
            </a>
            <img
                v-else
                :src="imagePath"
                class="w-full cursor-pointer"
                @click="zoomed = true"
            />
        </div>
        <div class="italic max-w-[80vw] text-center">
            <slot name="caption" />
            {{ caption }}
        </div>
        <ImageZoom
            v-if="zoomed"
            :image-path="imagePath"
            @close="zoomed = false"
        />
    </div>
</template>

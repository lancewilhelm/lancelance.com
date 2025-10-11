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
            <!-- Internal route -->
            <NuxtLink v-if="link && link.startsWith('/')" :to="link">
                <img :src="imagePath" class="w-full cursor-pointer" />
            </NuxtLink>

            <!-- External link -->
            <a v-else-if="link" :href="link" rel="noopener">
                <!-- Remove target="_blank" if you want same-tab navigation -->
                <img :src="imagePath" class="w-full cursor-pointer" />
            </a>

            <!-- No link: enable zoom -->
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

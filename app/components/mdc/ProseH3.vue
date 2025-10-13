<script setup lang="ts">
import { ref } from "vue";
import { useElementHover } from "@vueuse/core";

defineProps({
    id: {
        type: String,
        default: "",
    },
});

const containerRef = ref<HTMLElement | null>(null);
const isHovered = useElementHover(containerRef);
const copied = ref(false);

function copyHeaderLink(id: string) {
    if (!id) return;

    const baseUrl = window.location.origin + window.location.pathname;
    const fullUrl = `${baseUrl}#${id}`;
    navigator.clipboard.writeText(fullUrl);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
}
</script>

<template>
    <div
        :id="id"
        ref="containerRef"
        class="flex items-center gap-2"
    >
        <h3>
            <slot />
        </h3>
        <div
            v-if="isHovered"
            class="cursor-pointer flex flex-shrink"
            :aria-label="copied ? 'Link copied' : 'Copy link to heading'"
        >
            <Icon
                v-if="copied"
                name="lucide:thumbs-up"
                class="text-(--main-color)"
            />
            <Icon
                v-else
                name="lucide:link"
                class="text-(--main-color)"
                @click="copyHeaderLink(id)"
            />
        </div>
    </div>
</template>

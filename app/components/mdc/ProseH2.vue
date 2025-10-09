<script setup lang="ts">
import { ref } from "vue";

defineProps({
    id: {
        type: String,
        default: "",
    },
});

const isHovered = ref(false);
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
        class="flex items-center gap-2"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <h2>
            <slot />
        </h2>
        <div
            v-if="isHovered"
            class="cursor-pointer translate-y-1"
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

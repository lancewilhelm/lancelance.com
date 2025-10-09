<script setup>
const showThemePicker = ref(false);
</script>

<template>
    <footer
        class="flex row-start-[content-end] col-start-[content-start] justify-center items-center"
    >
        <div
            class="cursor-pointer flex gap-1 items-center"
            @click="showThemePicker = true"
        >
            <Icon name="fa6-solid:palette" class="text-(--sub-color)" />
            <NuxtLink
                class="flex items-center"
                to="https://github.com/lancewilhelm"
                ><Icon name="simple-icons:github" class="text-(--sub-color)"
            /></NuxtLink>
        </div>
        <ThemePicker v-if="showThemePicker" @close="showThemePicker = false" />
    </footer>
</template>

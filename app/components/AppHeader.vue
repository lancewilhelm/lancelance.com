<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <header
        class="flex flex-col justify-center items-center row-start-[header-start] col-start-[content-start] col-end-[content-end]"
    >
        <div
            id="logo"
            :class="[
                route.fullPath !== '/' ? 'w-[150px] sm:w-[300px]' : 'w-[300px]',
            ]"
        >
            <NuxtLink to="/" aria-label="home">
                <AppLogo />
            </NuxtLink>
        </div>
        <div
            id="links"
            class="flex gap-[10px] justify-center font-mono text-md w-auto text-(--sub-color)"
        >
            <NuxtLink
                to="/blog"
                :class="{ 'underline!': route?.name === 'blog' }"
                >Blog</NuxtLink
            >
            <span>|</span>
            <NuxtLink
                to="/projects"
                :class="{ 'underline!': route?.name === 'projects' }"
                >Projects</NuxtLink
            >
            <span>|</span>
            <NuxtLink
                to="/about"
                :class="{ 'underline!': route?.name === 'projects' }"
                >About</NuxtLink
            >
        </div>
    </header>
</template>

<style scoped>
a {
    text-decoration: none;
}
</style>

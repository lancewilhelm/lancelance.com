<script setup lang="ts"></script>

<template>
    <div class="w-screen min-h-dvh grid blog-grid-template">
        <AppHeader />
        <div
            class="w-full h-full row-start-[content-start] row-end-[content-end] col-start-[content-start] col-end-[content-end] flex flex-col text-wrap overflow-x-hidden"
        >
            <slot />
        </div>
        <AppFooter />
    </div>
</template>

<style scoped>
.blog-grid-template {
    grid-template-rows:
        [gutter-start] var(--gutter)
        [header-start] min-content [header-padding-start] var(--gutter)
        [content-start] 1fr [content-end] 40px [gutter-end];
    grid-template-columns:
        [full-width-start] minmax(0, var(--gutter))
        [full-width-padding-start] minmax(0, 1fr) [content-start] min(
            100% - var(--gutter) * 2,
            var(--content-max-width)
        )
        [content-end] minmax(0, 1fr) [full-width-padding-end] minmax(
            0,
            var(--gutter)
        )
        [full-width-start];
}
</style>

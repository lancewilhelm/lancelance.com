<script setup lang="ts">
import type { Project } from "#shared/types/projects";

definePageMeta({
    layout: "blog",
});

const route = useRoute();
const slug = route.params.slug as string;

const { data: projectData } = await useAsyncData<Project>(
    `project-${slug}`,
    () => {
        return $fetch<Project>(`/api/projects/${slug}`);
    },
);

const project = computed<Project | null>(() => projectData.value ?? null);

if (!project.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
    });
}

useHead(() => {
    if (!project.value) {
        return {};
    }
    return {
        title: project.value.title,
        meta: [
            { name: "description", content: project.value.description },
            { property: "og:title", content: project.value.title },
            { property: "og:description", content: project.value.description },
            {
                property: "og:url",
                content: `https://lancelance.dev${route.path}`,
            },
            { name: "twitter:title", content: project.value.title },
            { name: "twitter:description", content: project.value.description },
            {
                name: "twitter:url",
                content: `https://lancelance.dev${route.path}`,
            },
        ],
    };
});
</script>

<template>
    <div v-if="project" class="w-full text-wrap sm:px-4">
        <div class="flex flex-col gap-1">
            <div class="text-4xl text-(--main-color)">{{ project.title }}</div>
            <div class="italic">{{ project.description }}</div>
            <div
                class="flex flex-wrap gap-2 items-center pb-2 text-(--sub-color)"
            >
                <!-- date removed -->
                <span
                    class="px-2 py-[2px] rounded bg-(--sub-color)/10 border border-(--sub-color)/30 text-(--sub-color) capitalize text-sm"
                >
                    {{ project.category }}
                </span>
            </div>
        </div>
        <MDC :value="project.content" class="flex flex-col gap-2 content" />
    </div>
</template>

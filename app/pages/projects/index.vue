<script setup lang="ts">
import type { ProjectPreview, ProjectCategory } from "#shared/types/projects";

useSeoMeta({
    title: "Projects - LanceLance",
    appleMobileWebAppTitle: "Projects - LanceLance",
});

definePageMeta({
    layout: "blog",
});

const { data: groupedProjects } = await useAsyncData<
    Record<ProjectCategory, ProjectPreview[]>
>("projects-grouped", () => {
    return $fetch<Record<ProjectCategory, ProjectPreview[]>>(
        "/api/projects/list?grouped=true",
    );
});

const categories: ProjectCategory[] = ["work", "academic", "personal"];

const sectionTitles: Record<ProjectCategory, string> = {
    work: "Work",
    academic: "Academic",
    personal: "Personal",
};

const grouped = computed<Record<ProjectCategory, ProjectPreview[]>>(() => {
    return (
        groupedProjects.value ?? {
            work: [],
            academic: [],
            personal: [],
        }
    );
});

const visibleSections = computed(() =>
    categories
        .map((category) => ({
            category,
            title: sectionTitles[category],
            items: grouped.value[category] ?? [],
        }))
        .filter((s) => s.items.length > 0),
);
const showOrder = false;
</script>

<template>
    <div class="flex flex-col max-w-[700px] self-center gap-[40px]">
        <section
            v-for="sec in visibleSections"
            :key="sec.category"
            class="flex flex-col gap-[20px]"
        >
            <div class="text-2xl font-bold capitalize text-(--sub-color)">
                {{ sec.title }}
            </div>

            <div class="flex flex-col gap-[20px]">
                <NuxtLink
                    v-for="proj in sec.items"
                    :key="proj.slug"
                    :to="proj.path"
                    class="p-[5px] border-l-[3px] border-l-(--sub-color) hover:border-l-(--main-color) no-underline! transition duration-[300ms] blog-card"
                >
                    <div
                        class="grid grid-cols-[auto_min-content] grid-rows-2] gap-x-[10px] gap-y-[5px]"
                    >
                        <div class="grid col-start-1 font-bold text-xl">
                            {{ proj.title }}
                            <span
                                v-if="showOrder"
                                class="ml-2 text-sm text-(--sub-color)"
                                >#{{ proj.order }}</span
                            >
                        </div>
                        <div class="grid col-start-1 row-start-2 self-end">
                            {{ proj.description }}
                        </div>
                        <!-- date removed; optionally display order via showOrder -->
                    </div>
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

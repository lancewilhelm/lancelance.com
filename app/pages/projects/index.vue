<script setup lang="ts">
import type { ProjectPreview, ProjectCategory } from "#shared/types/projects";

useSeoMeta({
  title: "Projects - LanceLance",
  appleMobileWebAppTitle: "Projects - LanceLance",
});

definePageMeta({
  layout: "blog",
});

const { data: groupedProjects, error } = await useAsyncData<
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
  <div class="flex flex-col gap-4 items-center">
    <div v-if="error" role="alert">
      Unable to load projects.
      <button
        type="button"
        class="underline"
        @click="reloadNuxtApp({ force: true })"
      >
        Try again
      </button>
    </div>
    <section
      v-for="sec in visibleSections"
      v-else
      :key="sec.category"
      class="flex flex-col gap-[20px] grow items-center"
    >
      <h2 class="text-3xl font-bold capitalize text-(--main-color)">
        {{ sec.title }}
      </h2>

      <div class="flex flex-row gap-[20px] flex-wrap justify-center">
        <NuxtLink
          v-for="(proj, index) in sec.items"
          :key="proj.slug"
          :to="proj.path"
          class="p-2 pt-3 border-t-[3px] border-t-(--sub-color) hover:border-t-(--main-color) no-underline! transition duration-[300ms] blog-card w-[300px]"
        >
          <div class="flex flex-col gap-2">
            <ResponsiveImage
              :src="proj.image"
              alt=""
              sizes="300px"
              :eager="index < 3"
              class="w-full cursor-pointer"
            />
            <div class="grid col-start-1 font-bold text-xl">
              {{ proj.title }}
              <span v-if="showOrder" class="ml-2 text-sm text-(--sub-color)"
                >#{{ proj.order }}</span
              >
            </div>
            <div
              class="grid col-start-1 row-start-2 self-end italic text-[var(--sub-text-color,var(--sub-color))]"
            >
              {{ proj.description }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSeoMeta } from "@unhead/vue";
import {
  PROJECT_CATEGORIES,
  getProjectsGroupedByCategory,
  type ProjectCategory,
} from "@/content/projects";
import ResponsiveImage from "@/components/ResponsiveImage.vue";

useSeoMeta({
  title: "Projects - LanceLance",
  appleMobileWebAppTitle: "Projects - LanceLance",
});

const sectionTitles: Record<ProjectCategory, string> = {
  work: "Work",
  personal: "Personal",
  academic: "Academic",
};

const grouped = getProjectsGroupedByCategory();

const visibleSections = computed(() =>
  PROJECT_CATEGORIES.map((category) => ({
    category,
    title: sectionTitles[category],
    items: grouped[category] ?? [],
  })).filter((s) => s.items.length > 0),
);
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <section
      v-for="sec in visibleSections"
      :key="sec.category"
      class="flex flex-col gap-[20px] grow items-center"
    >
      <h2 class="text-3xl font-bold capitalize text-(--main-color)">
        {{ sec.title }}
      </h2>

      <div class="flex flex-row gap-[20px] flex-wrap justify-center">
        <RouterLink
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
            </div>
            <div
              class="grid col-start-1 row-start-2 self-end italic text-[var(--sub-text-color,var(--sub-color))]"
            >
              {{ proj.description }}
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

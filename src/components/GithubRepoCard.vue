<script setup lang="ts">
import { computed } from "vue";
import githubLanguageColors from "@/assets/github_colors.json";
import githubRepos from "@/data/github-repos.json";

type GithubLanguageColors = Record<
  string,
  { color: string | null; url: string }
>;

type GithubRepoData = {
  html_url: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
};

const props = defineProps<{
  repo: string;
}>();

const catalog = githubRepos as Record<string, GithubRepoData>;
const repoData = computed<GithubRepoData | null>(
  () => catalog[props.repo] ?? null,
);
</script>

<template>
  <div
    class="flex flex-col self-center gap-[5px] font-mono min-w-[300px] max-w-[500px] rounded-lg p-[10px] bg-(--sub-color) shadow-[4px_6px_0_rgba(0,0,0,1)] my-[10px]"
  >
    <a
      :href="`https://github.com/${repo}`"
      target="_blank"
      rel="noopener noreferrer"
      class="no-underline!"
    >
      <div class="flex items-center gap-[6px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-4 h-4 fill-current text-(--main-color) shrink-0"
          aria-hidden="true"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
        {{ repoData?.full_name || repo }}
      </div>
    </a>
    <div class="italic font-sans">
      {{
        repoData
          ? repoData.description || "No description provided."
          : "Repository details are temporarily unavailable."
      }}
    </div>
    <div v-if="repoData" class="flex gap-[15px]">
      <div
        v-if="repoData.language"
        class="flex items-center justify-center gap-[5px]"
      >
        <div
          class="w-[14px] h-[14px] rounded-full"
          :style="{
            backgroundColor:
              (githubLanguageColors as GithubLanguageColors)[repoData.language]
                ?.color || '#000000',
          }"
        ></div>
        {{ repoData.language }}
      </div>
      <div class="flex items-center justify-center gap-[4px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          class="w-3.5 h-3.5 fill-current text-(--main-color)"
          aria-hidden="true"
        >
          <path
            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          />
        </svg>
        {{ repoData.stargazers_count }}
      </div>
      <div class="flex items-center justify-center gap-[4px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="w-3.5 h-3.5 fill-current text-(--main-color)"
          aria-hidden="true"
        >
          <path
            d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3l0 87.8c18.8-10.9 40.7-17.1 64-17.1l96 0c35.3 0 64-28.7 64-64l0-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 6.7c0 70.7-57.3 128-128 128l-96 0c-35.3 0-64 28.7-64 64l0 6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3l0-6.7 0-198.7C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
          />
        </svg>
        {{ repoData.forks_count }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import githubLanguageColors from "~/assets/github_colors.json";
type GithubLanguageColors = Record<
    string,
    { color: string | null; url: string }
>;

const props = defineProps({
    repo: {
        type: String,
        default: "",
    },
});

type GithubRepoData = {
    html_url: string;
    full_name: string;
    description: string;
    language: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
};

const { data: repoData } = await useFetch<GithubRepoData>(
    `https://api.github.com/repos/${props.repo}`,
    {
        key: `github-repo-${props.repo}`,
    },
);
</script>

<template>
    <div
        v-if="repoData"
        class="flex flex-col self-center gap-[5px] font-mono min-w-[300px] max-w-[500px] rounded-lg p-[10px] bg-(--sub-color) shadow-[4px_6px_0_rgba(0,0,0,1)] my-[10px]"
    >
        <a :href="repoData.html_url" class="no-underline!">
            <div class="flex items-center gap-[3px]">
                <Icon
                    name="fa6-brands:github"
                    class="text-(--main-color) translate-y-[-1px]"
                />
                {{ repoData.full_name }}
            </div>
        </a>
        <div class="italic font-sans">{{ repoData.description }}</div>
        <div class="flex gap-[15px]">
            <div
                class="flex items-center justify-center align-center gap-[3px]"
            >
                <div
                    class="w-[15px] h-[15px] rounded-full"
                    :style="{
                        backgroundColor:
                            (githubLanguageColors as GithubLanguageColors)[
                                repoData.language
                            ]?.color || '#000000',
                    }"
                ></div>
                {{ repoData.language }}
            </div>
            <div
                class="flex items-center justify-center align-center gap-[3px]"
            >
                <Icon
                    name="fa6-solid:star"
                    class="text-(--main-color) translate-y-[-1px]"
                />
                {{ repoData.stargazers_count }}
            </div>
            <div
                class="flex items-center justify-center align-center gap-[3px]"
            >
                <Icon
                    name="fa6-solid:code-fork"
                    class="text-(--main-color) translate-y-[-1px]"
                />
                {{ repoData.forks_count }}
            </div>
        </div>
    </div>
</template>

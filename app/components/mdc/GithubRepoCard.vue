<script setup lang="ts">
import githubLanguageColors from "~/assets/github_colors.json";

const props = defineProps({
    repo: {
        type: String,
        default: "",
    },
});

const { data: repoData } = await useFetch(
    `https://api.github.com/repos/${props.repo}`,
    {
        key: `github-repo-${props.repo}`,
    },
);
</script>

<template>
    <div
        v-if="repoData"
        class="flex flex-col self-center gap-[5px] font-mono max-w-[300px] rounded-lg p-[10px] bg-(--sub-color) shadow-[4px_6px_0_rgba(0,0,0,1)] my-[10px]"
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
                            githubLanguageColors[repoData.language].color,
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

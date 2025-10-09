<script setup>
import themesList from "~/assets/themes.json";

const emit = defineEmits(["close", "theme-change"]);
const configStore = useConfigStore();

const themes = JSON.parse(JSON.stringify(themesList)).sort((a, b) =>
    a.name.localeCompare(b.name),
);
const config = configStore.config;

document.addEventListener("mousedown", handleClickOutside);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        emit("close");
    }
});

function handleClickOutside(event) {
    if (
        event.target.id === "theme-picker" ||
        event.target.id === "theme-picker-scroll"
    ) {
        emit("close");
    }
}

function handleChangeTheme(theme) {
    config.theme = theme.name;
    setTheme(theme.name);
    configStore.patchConfig({ theme: theme.name });
    emit("theme-change", theme.name);
}
</script>

<template>
    <div
        id="theme-picker"
        class="fixed grid items-center justify-center z-10 left-0 top-0 w-full h-full overflow-auto bg-black/60"
    >
        <div
            id="theme-picker-scroll"
            class="grid items-center justify-center h-full"
        >
            <div
                id="theme-picker-content"
                class="grid bg-(--bg-color) border-3 border-(--fg-color) rounded-lg h-[75dvh] w-72 sm:w-96 overflow-y-auto gap-1 py-2"
            >
                <div
                    v-for="theme in themes"
                    :key="theme.name"
                    :class="[
                        'grid grid-cols-[1fr_auto] justify-center cursor-pointer px-2',
                        {
                            'border-y-3 border-(--fg-color)':
                                config.theme && config.theme === theme.name,
                        },
                    ]"
                    @click="handleChangeTheme(theme)"
                >
                    <div class="flex text-sm items-center font-bold font-mono">
                        {{ theme.name }}
                    </div>
                    <div
                        class="grid grid-cols-3 gap-1 items-center justify-center p-2 rounded-full"
                        :style="{ 'background-color': theme.bgColor }"
                    >
                        <div
                            class="w-4 h-4 rounded-full"
                            :style="{ 'background-color': theme.mainColor }"
                        />
                        <div
                            class="w-4 h-4 rounded-full"
                            :style="{ 'background-color': theme.subColor }"
                        />
                        <div
                            class="w-4 h-4 rounded-full"
                            :style="{ 'background-color': theme.textColor }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

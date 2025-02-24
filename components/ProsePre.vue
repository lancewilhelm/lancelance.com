<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { useClipboard } from '@vueuse/core'

// Config
const appConfig = useAppConfig()

//Props
interface Props {
  code: string
  language?: string | null
  filename?: string | null
  highlights?: Array<number> | null
  meta?: string | null
  class?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: null,
  filename: null,
  highlights: null,
  meta: null,
  class: null
})

const parsedCode = await codeToHtml(props.code, { lang: props.language, theme: appConfig.shikiTheme })
const { copy, copied, text } = useClipboard()
const copyBtnPressed = ref<Boolean>(false);

function copyCode() {
  copy(props.code)
  copyBtnPressed.value = true
  setTimeout(() => copyBtnPressed.value = false, 1000)
}
</script>

<template>
  <div class="flex flex-col my-[10px] sm:m-[10px]">
    <div class="grid grid-cols-[min-content_max-content_auto_min-content] text-sm font-mono">
      <div v-if='language'
        :class="['bg-(--main-color) text-(--bg-color) p-[5px] rounded-tl-(--border-radius) col-start-1 italic', !filename ? 'rounded-tr-lg' : '']">
        {{
          language }}
      </div>
      <div v-if='filename' class="bg-(--sub-color) text-(--fg-color) p-[5px] rounded-tr-(--border-radius) col-start-2">
        {{ filename
        }}</div>
      <div
        class="bg-(--main-color) text-(--bg-color) p-[5px] rounded-t-(--border-radius) col-start-4 cursor-pointer hover:bg-(--sub-color) transition-all duration-300 copy-code-btn"
        @click="copyCode">
        {{ copied ? 'copied!' : 'copy' }}
      </div>
    </div>
    <div v-html="parsedCode"></div>
  </div>
</template>

<style>
pre {
  padding: 10px;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  overflow-x: auto;
}
</style>

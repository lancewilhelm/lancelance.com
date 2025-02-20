import { defineStore } from 'pinia'

interface Config {
  theme?: string
  [key: string]: any
}

export const useConfigStore = defineStore('config', () => {
  let config: Config;
  if (import.meta.client) {
    config = JSON.parse(localStorage.getItem('config') || '') as Config;
  } else {
    config = {};
  }

  function setConfig(c: Config) {
    localStorage.setItem('config', JSON.stringify(c))
  }

  async function patchConfig(patch: Partial<Config>) {
    console.log(`patching config ${patch}`)
    localStorage.setItem('config', JSON.stringify({ ...config, ...patch }))
    return patch
  }

  return {
    config,
    setConfig,
    patchConfig,
  }
})

import { defineStore } from 'pinia'

interface Config {
  theme?: string;
  [key: string]: any;
}

export const useConfigStore = defineStore('config', () => {
  // Make the config state reactive
  const config = ref<Config>({ theme: 'monochrome' });

  // Load from localStorage only on the client
  if (import.meta.client) {
    const savedConfig = localStorage.getItem('config');
    if (savedConfig) {
      try {
        config.value = JSON.parse(savedConfig) as Config;
      } catch (e) {
        console.error('Error parsing config from localStorage:', e);
      }
    } else {
      saveToLocalStorage(config.value);
    }
  }

  // Function to persist config to localStorage
  function saveToLocalStorage(updatedConfig: Config) {
    localStorage.setItem('config', JSON.stringify(updatedConfig));
  }

  // Function to set a new config
  function setConfig(newConfig: Config) {
    config.value = newConfig;
    saveToLocalStorage(newConfig);
  }

  // Function to update parts of the config
  function patchConfig(patch: Partial<Config>) {
    config.value = { ...config.value, ...patch };
    saveToLocalStorage(config.value);
    return patch;
  }

  return {
    config,
    setConfig,
    patchConfig,
  };
});

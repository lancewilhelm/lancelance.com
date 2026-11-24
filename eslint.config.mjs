import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: [
      "dist/**",
      "dist-ssr/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "public/js/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "vue/html-self-closing": "off",
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "vue/multi-word-component-names": "off",
    },
  },
  eslintConfigPrettier,
];

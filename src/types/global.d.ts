interface ThemeOption {
  readonly name: string;
  readonly bgColor: string;
  readonly mainColor: string;
  readonly subColor: string;
  readonly textColor: string;
}
interface Window {
  readonly themeRuntime: {
    readonly themes: readonly ThemeOption[];
    readonly systemThemes: { readonly light: string; readonly dark: string };
    /** The resolved theme currently applied. */
    current(): string;
    /** The committed choice: a theme name or "system". */
    preference(): string;
    select(name: string): void;
  };
}

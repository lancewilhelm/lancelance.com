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
    current(): string;
    select(name: string): void;
  };
}

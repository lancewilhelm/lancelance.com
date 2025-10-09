/**
 * Global type declarations for browser globals and custom functions
 * injected via public/js scripts.
 */

/**
 * setTheme function injected by theme-loader.js
 * Allows runtime theme switching by updating the CSS link and localStorage
 */
declare function setTheme(themeName: string): void;

/**
 * Extend Window interface for any other globals if needed
 */
interface Window {
  setTheme: typeof setTheme;
}

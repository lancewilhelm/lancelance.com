import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

type Runtime = {
  themes: readonly { name: string }[];
  systemThemes: { light: string; dark: string };
  current(): string;
  preference(): string;
  select(name: string): void;
};

function loadRuntime(initial: string, options: { dark?: boolean } = {}) {
  let stored = initial;
  const links = new Map();
  const listeners: (() => void)[] = [];
  const query = {
    matches: Boolean(options.dark),
    addEventListener: (_type: string, listener: () => void) =>
      listeners.push(listener),
  };
  const document = {
    body: null,
    readyState: "complete",
    getElementById: (id: string) => links.get(id),
    createElement: () => ({
      setAttribute() {},
      removeAttribute() {
        links.delete(this.id);
        this.id = "";
      },
      remove() {
        if (links.get(this.id) === this) links.delete(this.id);
      },
      id: "",
    }),
    head: {
      appendChild(link: { id: string }) {
        links.set(link.id, link);
      },
    },
  };
  const window: {
    dispatchEvent(event: Event): void;
    matchMedia(media: string): typeof query;
    themeRuntime?: Runtime;
  } = { dispatchEvent() {}, matchMedia: () => query };
  vm.runInNewContext(fs.readFileSync("public/js/theme-loader.js", "utf8"), {
    document,
    window,
    Event,
    localStorage: {
      getItem: () => stored,
      setItem: (_key: string, value: string) => {
        stored = value;
      },
    },
  });
  assert.ok(window.themeRuntime);
  return {
    runtime: window.themeRuntime,
    link: () => links.get("currentTheme"),
    stored: () => JSON.parse(stored),
    setDark(dark: boolean) {
      query.matches = dark;
      listeners.forEach((listener) => listener());
    },
  };
}

test("theme catalog has exactly the available stylesheets and rejects unknown names", () => {
  const { runtime, link, stored } = loadRuntime(
    '{"theme":"dracula","other":"preserved"}',
  );
  assert.equal(runtime.current(), "sage_light");
  assert.equal(runtime.preference(), "system");
  link().onload();
  assert.deepEqual(
    [...runtime.themes.map((theme) => theme.name)].sort(),
    fs
      .readdirSync("public/css/themes")
      .filter((name) => name.endsWith(".css"))
      .map((name) => name.slice(0, -4))
      .sort(),
  );
  assert.equal(runtime.current(), "dracula");
  runtime.select("../../invalid");
  assert.equal(runtime.current(), "dracula");
  runtime.select("paper");
  assert.equal(runtime.current(), "dracula");
  assert.equal(stored().theme, "dracula");
  link().onload();
  assert.equal(runtime.current(), "paper");
  assert.equal(stored().theme, "paper");
  assert.equal(stored().other, "preserved");
});

test("system preference is the default and follows the color scheme", () => {
  const { runtime, link, stored, setDark } = loadRuntime("{}", { dark: true });
  assert.deepEqual(
    { ...runtime.systemThemes },
    {
      light: "sage_light",
      dark: "sage_nord",
    },
  );
  assert.equal(link().href, "/css/themes/sage_nord.css");
  link().onload();
  assert.equal(runtime.current(), "sage_nord");
  assert.equal(runtime.preference(), "system");
  assert.equal(stored().theme, "system");

  setDark(false);
  assert.equal(link().href, "/css/themes/sage_light.css");
  link().onload();
  assert.equal(runtime.current(), "sage_light");
  assert.equal(runtime.preference(), "system");

  runtime.select("dracula");
  link().onload();
  setDark(true);
  assert.equal(link().href, "/css/themes/dracula.css");
  assert.equal(runtime.current(), "dracula");
  assert.equal(stored().theme, "dracula");

  runtime.select("system");
  link().onload();
  assert.equal(runtime.current(), "sage_nord");
  assert.equal(stored().theme, "system");
});

test("a saved explicit theme is restored and a failed one falls back to system", () => {
  const { runtime, link, stored } = loadRuntime('{"theme":"sage_light"}', {
    dark: true,
  });
  link().onload();
  assert.equal(runtime.current(), "sage_light");
  assert.equal(runtime.preference(), "sage_light");

  const failing = loadRuntime('{"theme":"dracula"}');
  failing.link().onerror();
  assert.equal(failing.runtime.current(), "sage_light");
  assert.equal(failing.runtime.preference(), "system");
  assert.equal(failing.stored().theme, "system");
  assert.equal(stored().theme, "sage_light");
});

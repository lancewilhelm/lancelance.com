import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

test("theme catalog has exactly the available stylesheets and rejects unknown names", () => {
  let stored = '{"theme":"dracula","other":"preserved"}';
  const links = new Map();
  const document = {
    body: null,
    readyState: "complete",
    getElementById: (id: string) => links.get(id),
    createElement: () => ({
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
    themeRuntime?: {
      themes: readonly { name: string }[];
      current(): string;
      select(name: string): void;
    };
  } = { dispatchEvent() {} };
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
  const runtime = window.themeRuntime;
  assert.ok(runtime);
  assert.equal(runtime.current(), "paper");
  links.get("currentTheme").onload();
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
  assert.equal(JSON.parse(stored).theme, "dracula");
  links.get("currentTheme").onload();
  assert.equal(runtime.current(), "paper");
  assert.equal(JSON.parse(stored).theme, "paper");
  assert.equal(JSON.parse(stored).other, "preserved");
});

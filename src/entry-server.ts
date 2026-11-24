import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { createHead } from "@unhead/vue/server";
import { renderSSRHead } from "@unhead/vue/server";
import App from "./App.vue";
import { createSiteRouter } from "./router";

export async function render(url: string) {
  const app = createSSRApp(App);
  const router = createSiteRouter(true);
  const head = createHead();

  app.use(router);
  app.use(head);

  await router.push(url);
  await router.isReady();

  const html = await renderToString(app);
  const headPayload = await renderSSRHead(head);

  return {
    html,
    headTags: headPayload.headTags,
  };
}

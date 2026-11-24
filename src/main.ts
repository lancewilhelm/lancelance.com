import { createSSRApp, createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import App from "./App.vue";
import { createSiteRouter } from "./router";
import "./assets/css/main.css";
import "./assets/css/hljs.css";

const root = document.getElementById("app");
const isHydrating = Boolean(root && root.innerHTML.trim() && !root.innerHTML.includes("<!--app-html-->"));
const app = isHydrating ? createSSRApp(App) : createApp(App);
const router = createSiteRouter();
const head = createHead();

app.use(router);
app.use(head);

router.isReady().then(() => {
  app.mount("#app", isHydrating);
});

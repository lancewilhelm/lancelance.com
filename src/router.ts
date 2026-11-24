import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import BlogIndexPage from "@/pages/BlogIndexPage.vue";
import BlogPostPage from "@/pages/BlogPostPage.vue";
import ProjectsIndexPage from "@/pages/ProjectsIndexPage.vue";
import ProjectDetailPage from "@/pages/ProjectDetailPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: { layout: "default" },
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
    meta: { layout: "blog" },
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogIndexPage,
    meta: { layout: "blog" },
  },
  {
    path: "/blog/:slug",
    name: "blog-post",
    component: BlogPostPage,
    meta: { layout: "blog" },
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsIndexPage,
    meta: { layout: "blog" },
  },
  {
    path: "/projects/:slug",
    name: "project-detail",
    component: ProjectDetailPage,
    meta: { layout: "blog" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
    meta: { layout: "none" },
  },
];

export function createSiteRouter(ssr = false) {
  return createRouter({
    history: ssr ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash };
      return { top: 0 };
    },
  });
}

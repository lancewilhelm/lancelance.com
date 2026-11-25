import type { Component } from "vue";
import GradioAnnotatorPost from "./GradioAnnotatorPost.vue";
import VueChatbot1Post from "./VueChatbot1Post.vue";
import VueChatbot2Post from "./VueChatbot2Post.vue";
import VueChatbot3Post from "./VueChatbot3Post.vue";
import CausalAttnPost from "./CausalAttnPost.vue";
import RagBotPost from "./RagBotPost.vue";

export interface BlogPostEntry {
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  component: Component;
}

export const blogPosts: readonly BlogPostEntry[] = [
  {
    slug: "gradio-annotator",
    path: "/blog/gradio-annotator",
    title: "Data Annotator Using Gradio",
    description: "Creating a simple UI to help with data annotation.",
    date: "2023-09-23T12:00:00Z",
    tags: ["Gradio","Data Science"],
    component: GradioAnnotatorPost,
  },
  {
    slug: "vue-chatbot1",
    path: "/blog/vue-chatbot1",
    title: "Vue.js Chatbot - Part 1: The Front-End",
    description: "In this first part, we build the chatbot front-end using Vue.js.",
    date: "2023-10-25 22:00:00",
    tags: ["Vue","LLM"],
    component: VueChatbot1Post,
  },
  {
    slug: "vue-chatbot2",
    path: "/blog/vue-chatbot2",
    title: "Vue.js Chatbot - Part 2: The Back-End",
    description: "In the second part, we build the chatbot back-end using FastAPI.",
    date: "2023-10-26 20:00:00",
    tags: ["Vue","LLM"],
    component: VueChatbot2Post,
  },
  {
    slug: "vue-chatbot3",
    path: "/blog/vue-chatbot3",
    title: "Vue.js Chatbot - Part 3: GPT-3.5 and MongoDB",
    description: "In the final part, we connect the chatbot to GPT-3.5 and store messages in MongoDB.",
    date: "2023-10-26 22:00:00",
    tags: ["Vue","LLM"],
    component: VueChatbot3Post,
  },
  {
    slug: "causal-attn",
    path: "/blog/causal-attn",
    title: "Understanding Causal Attention",
    description: "Understanding how causal attention works in transformer models.",
    date: "2023-11-26 00:00:00",
    tags: ["Transformer","Deep Learning"],
    component: CausalAttnPost,
  },
  {
    slug: "rag-bot",
    path: "/blog/rag-bot",
    title: "Simple RAG-Based AI Chatbot",
    description: "Building a simple retrieval-augmented generation (RAG) chatbot with LangChain to query a collection of podcast transcripts.",
    date: "2024-11-14 00:00:00",
    tags: ["RAG","LLM"],
    component: RagBotPost,
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getBlogPostBySlug(slug: string): BlogPostEntry | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

import type { Component } from "vue";
import AiLedgerProject from "./AiLedgerProject.vue";
import CommcoachProject from "./CommcoachProject.vue";
import DelbProject from "./DelbProject.vue";
import DronespacePiGatesProject from "./DronespacePiGatesProject.vue";
import GuageProject from "./GuageProject.vue";
import HatefulMemesProject from "./HatefulMemesProject.vue";
import HfgetProject from "./HfgetProject.vue";
import HorizonExtendedProject from "./HorizonExtendedProject.vue";
import HouseNumbersProject from "./HouseNumbersProject.vue";
import LanceSkillsProject from "./LanceSkillsProject.vue";
import NvimDashboardVscodeProject from "./NvimDashboardVscodeProject.vue";
import PpbcProject from "./PpbcProject.vue";
import RedditPoliticsProject from "./RedditPoliticsProject.vue";
import RetroboardFlightProject from "./RetroboardFlightProject.vue";
import RetroboardProject from "./RetroboardProject.vue";
import ShpacerProject from "./ShpacerProject.vue";
import StafProject from "./StafProject.vue";
import StreamdeckLlmUsageProject from "./StreamdeckLlmUsageProject.vue";

export type ProjectCategory = "work" | "personal" | "academic";

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  "work",
  "personal",
  "academic",
];

export interface ProjectEntry {
  slug: string;
  path: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  order: number;
  tags: string[];
  hidden?: boolean;
  component: Component;
}

const rawProjects: ProjectEntry[] = [
  {
    slug: "commcoach",
    path: "/projects/commcoach",
    title: "CommCoach",
    description:
      "PhD research platform at Virginia Tech that explores AI role-play and reflective coaching for leadership communication at work",
    image: "/img/commcoach/roleplay.png",
    category: "academic",
    order: 1,
    tags: ["hci", "ai", "leadership", "phd-research"],
    component: CommcoachProject,
  },
  {
    slug: "ai-ledger",
    path: "/projects/ai-ledger",
    title: "AI Ledger",
    description:
      "Self-hosted logger for AI usage, lossless transcript archive, and local dashboard for Claude Code, Codex, Antigravity, T3 Code, and Hermes",
    image: "/img/ai-ledger/dashboard-overview.png",
    category: "personal",
    order: 1,
    tags: ["ai", "self-hosted", "go", "sqlite", "open-source"],
    component: AiLedgerProject,
  },
  {
    slug: "delb",
    path: "/projects/delb",
    title: "Delb",
    description:
      "Self-hosted web app for organizing and reading personal ebooks and PDFs",
    image: "/img/delb/library.png",
    category: "personal",
    order: 1,
    tags: ["ebooks", "self-hosted", "open-source"],
    component: DelbProject,
  },
  {
    slug: "streamdeck-llm-usage",
    path: "/projects/streamdeck-llm-usage",
    title: "LLM Usage (Stream Deck Plugin)",
    description:
      "Stream Deck plugin that tracks subscription usage for Claude, Codex, and Google AI with a linear burn-rate marker",
    image: "/img/streamdeck-llm-usage/hero.png",
    category: "personal",
    order: 2,
    tags: ["stream-deck", "ai", "hardware"],
    component: StreamdeckLlmUsageProject,
  },
  {
    slug: "staf",
    path: "/projects/staf",
    title: "Staf",
    description:
      "Self-hosted terminal and web workspace for AI assistants with persistent background conversations",
    image: "/img/staf/cover.png",
    category: "personal",
    order: 3,
    tags: ["ai", "agents", "self-hosted"],
    hidden: true,
    component: StafProject,
  },
  {
    slug: "guage",
    path: "/projects/guage",
    title: "Guage",
    description:
      "Self-hosted chat app for talking to local and cloud AI models from one interface",
    image: "/img/guage/cover.png",
    category: "personal",
    order: 4,
    tags: ["ai", "chat", "self-hosted"],
    hidden: true,
    component: GuageProject,
  },
  {
    slug: "shpacer",
    path: "/projects/shpacer",
    title: "Shpacer",
    description:
      "Self-hosted planner for race courses with route maps, elevation profiles, waypoints, and race notes",
    image: "/img/shpacer/course.png",
    category: "personal",
    order: 5,
    tags: ["running", "maps", "self-hosted"],
    component: ShpacerProject,
  },
  {
    slug: "retroboard-flight",
    path: "/projects/retroboard-flight",
    title: "Retroboard Flight",
    description:
      "Tabletop LED display and local web map for tracking nearby aircraft overhead",
    image: "/img/retroboard-flight/cover.png",
    category: "personal",
    order: 6,
    tags: ["led-matrix", "aviation", "hardware"],
    component: RetroboardFlightProject,
  },
  {
    slug: "horizon-extended",
    path: "/projects/horizon-extended",
    title: "Horizon Extended",
    description:
      "Family of warm dark and light themes that extends jolaleye's original Horizon theme across VS Code, Neovim, Zed, Kitty, and tmux",
    image: "/img/horizon-extended/thumbnail.png",
    category: "personal",
    order: 7,
    tags: ["theme", "vscode", "neovim", "zed", "open-source"],
    component: HorizonExtendedProject,
  },
  {
    slug: "lance-skills",
    path: "/projects/lance-skills",
    title: "lance-skills",
    description:
      "Repository of reusable skills for AI agents, including The Morning Intel PDF briefing and the Plain English editing skill",
    image: "/img/lance-skills/sample-page-1.png",
    category: "personal",
    order: 8,
    tags: ["ai", "agents", "automation"],
    component: LanceSkillsProject,
  },
  {
    slug: "hfget",
    path: "/projects/hfget",
    title: "hfget",
    description:
      "Terminal tool for searching and downloading open-source AI models from Hugging Face",
    image: "/img/hfget/screenshot.png",
    category: "personal",
    order: 9,
    tags: ["cli", "huggingface", "ai"],
    component: HfgetProject,
  },
  {
    slug: "nvim-dashboard-vscode",
    path: "/projects/nvim-dashboard-vscode",
    title: "Nvim Dashboard for VS Code",
    description:
      "VS Code extension that adds a text-based start screen modeled after dashboard-nvim",
    image: "/img/nvim-dashboard-vscode/dash.png",
    category: "personal",
    order: 10,
    tags: ["vscode", "neovim", "open-source"],
    component: NvimDashboardVscodeProject,
  },
  {
    slug: "ppbc",
    path: "/projects/ppbc",
    title: "Ping Pong Ball Clock (PPBC)",
    description:
      "Clock built with ping pong balls, LED strips, and a Raspberry Pi, controlled through a web app",
    image: "/img/ppbc/ppbc.jpg",
    category: "personal",
    order: 11,
    tags: ["python", "raspberry pi", "web app", "flask", "neopixel", "open-source"],
    component: PpbcProject,
  },
  {
    slug: "retroboard",
    path: "/projects/retroboard",
    title: "Retroboard",
    description:
      "Open-source retro LED matrix display for general use, inspired by the Tidbyt",
    image: "/img/retroboard/IMG_0982_crop.jpg",
    category: "personal",
    order: 12,
    tags: ["open-source", "led-matrix", "raspberry-pi", "python", "react"],
    component: RetroboardProject,
  },
  {
    slug: "dronespace-pi-gates",
    path: "/projects/dronespace-pi-gates",
    title: "DroneSpace Pi Gates",
    description:
      "Networked LED controller and web panel built for illuminated indoor FPV drone gates",
    image: "/img/dronespace-pi-gates/gates.jpg",
    category: "personal",
    order: 13,
    tags: ["leds", "hardware", "fpv"],
    component: DronespacePiGatesProject,
  },
  {
    slug: "hateful-memes",
    path: "/projects/hateful-memes",
    title: "Hateful Memes Challenge - Next Move",
    description:
      "Final project for Georgia Tech CS7643 (Deep Learning) that explores semi-supervised learning for classifying multimodal hateful memes",
    image: "/img/hateful-memes/mean-meme.png",
    category: "academic",
    order: 2,
    tags: ["deep-learning", "multimodal", "python", "pytorch"],
    component: HatefulMemesProject,
  },
  {
    slug: "house-numbers",
    path: "/projects/house-numbers",
    title: "House Number Detection and Classification",
    description:
      "Final project for Georgia Tech CS6476 (Computer Vision) that detects and classifies house numbers in photos using MSER and a fine-tuned ResNet18",
    image: "/img/house-numbers/house3_tiles.png",
    category: "academic",
    order: 3,
    tags: ["computer-vision", "deep-learning", "python", "opencv", "pytorch"],
    component: HouseNumbersProject,
  },
  {
    slug: "reddit-politics",
    path: "/projects/reddit-politics",
    title: "Dashboard for US Political Discourse Analysis",
    description:
      "Final project for Georgia Tech CS6242 (Data Visualization and Analytics) that compares political sentiment across opposing subreddits",
    image: "/img/reddit-politics/team009poster.jpg",
    category: "academic",
    order: 4,
    tags: ["nlp", "data-viz", "react", "python", "postgresql"],
    component: RedditPoliticsProject,
  },
];

export const allProjects: readonly ProjectEntry[] = [...rawProjects].sort(
  (a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  },
);

export const projects: readonly ProjectEntry[] = allProjects.filter(
  (project) => !project.hidden,
);

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsGroupedByCategory(): Record<
  ProjectCategory,
  ProjectEntry[]
> {
  const grouped: Record<ProjectCategory, ProjectEntry[]> = {
    work: [],
    personal: [],
    academic: [],
  };
  for (const project of projects) {
    grouped[project.category].push(project);
  }
  return grouped;
}

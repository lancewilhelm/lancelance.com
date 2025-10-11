/**
 * Shared types for Projects
 * Keep in sync with server-side parsing in server/utils/projects.ts
 */

export type ProjectCategory = "work" | "academic" | "personal";

export interface Project {
  title: string;
  description: string;
  order: number;
  tags: string[];
  category: ProjectCategory;
  slug: string;
  path: string;
  content: string;
}

export type ProjectPreview = Omit<Project, "content">;

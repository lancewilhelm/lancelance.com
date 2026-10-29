export type ProjectCategory = "work" | "academic" | "personal";

export interface Project {
  title: string;
  description: string;
  order: number;
  tags: string[];
  category: ProjectCategory;
  slug: string;
  image: string;
  path: string;
  content: string;
}

export type ProjectPreview = Omit<Project, "content">;

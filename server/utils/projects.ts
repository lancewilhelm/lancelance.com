import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

const CONTENT_DIR = path.join(process.cwd(), "content/projects");
export const CATEGORIES: ProjectCategory[] = ["work", "academic", "personal"];

function normalizeCategory(input: unknown): ProjectCategory {
  const val = String(input ?? "")
    .toLowerCase()
    .trim();
  if (val === "work" || val === "academic" || val === "personal") {
    return val;
  }
  // Default to "personal" if not specified or invalid
  return "personal";
}

function deriveSlug(filename: string): string {
  // Remove optional YYYY-MM-DD- prefix and .md extension
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
}

function buildPath(slug: string): string {
  return `/projects/${slug}`;
}

/**
 * Read and parse a single project markdown file returning a preview object
 */
function parseProjectPreviewFromFile(filePath: string): ProjectPreview {
  const filename = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);

  const slug = deriveSlug(filename);

  return {
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : 1000,
    tags: (Array.isArray(data.tags) ? data.tags : []) as string[],
    category: normalizeCategory(data.category),
    slug,
    path: buildPath(slug),
  };
}

/**
 * Read and parse a single project markdown file returning the full project
 */
function parseProjectFromFile(filePath: string): Project {
  const filename = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const slug = deriveSlug(filename);

  return {
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : 1000,
    tags: (Array.isArray(data.tags) ? data.tags : []) as string[],
    category: normalizeCategory(data.category),
    slug,
    path: buildPath(slug),
    content,
  };
}

/**
 * Return all project previews (no content), sorted by order asc, then title asc
 */
export function getAllProjects(): ProjectPreview[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const projects = mdFiles.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    return parseProjectPreviewFromFile(filePath);
  });

  // Sort by order asc, then title asc (case-insensitive)
  projects.sort((a, b) => {
    const oa =
      typeof a.order === "number" && Number.isFinite(a.order) ? a.order : 1000;
    const ob =
      typeof b.order === "number" && Number.isFinite(b.order) ? b.order : 1000;
    if (oa !== ob) return oa - ob;
    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });

  return projects;
}

/**
 * Return a project (with full content) by slug, or null if not found
 */
export function getProjectBySlug(slug: string): Project | null {
  if (!fs.existsSync(CONTENT_DIR)) {
    return null;
  }

  const files = fs.readdirSync(CONTENT_DIR);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const filename = mdFiles.find((file) => deriveSlug(file) === slug);
  if (!filename) {
    return null;
  }

  const filePath = path.join(CONTENT_DIR, filename);
  return parseProjectFromFile(filePath);
}

/**
 * Return project previews filtered by category
 */
export function getProjectsByCategory(
  category: ProjectCategory,
): ProjectPreview[] {
  const normalized = normalizeCategory(category);
  return getAllProjects().filter((p) => p.category === normalized);
}

/**
 * Return projects grouped by category
 */
export function getProjectsGroupedByCategory(): Record<
  ProjectCategory,
  ProjectPreview[]
> {
  const grouped: Record<ProjectCategory, ProjectPreview[]> = {
    work: [],
    academic: [],
    personal: [],
  };

  for (const project of getAllProjects()) {
    grouped[project.category].push(project);
  }

  return grouped;
}

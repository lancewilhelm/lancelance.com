import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostPreview } from "#shared/types/blog";
import { normalizeTagList } from "#shared/utils/tags";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

/**
 * Get all blog post metadata without reading full content
 */
export function getAllBlogPosts(): BlogPostPreview[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const posts = mdFiles.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    // Extract slug from filename (remove date prefix and .md extension)
    // e.g., "2023-10-25-vue-chatbot1.md" -> "vue-chatbot1"
    const slug = filename
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/\.md$/, "");

    return {
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      tags: normalizeTagList(data.tags),
      categories: data.categories || [],
      slug,
      path: `/blog/${slug}`,
    };
  });

  return posts;
}

/**
 * Get a single blog post by slug with full content
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(CONTENT_DIR)) {
    return null;
  }

  const files = fs.readdirSync(CONTENT_DIR);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  // Find the file that matches the slug
  const filename = mdFiles.find((file) => {
    const fileSlug = file
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/\.md$/, "");
    return fileSlug === slug;
  });

  if (!filename) {
    return null;
  }

  const filePath = path.join(CONTENT_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    tags: normalizeTagList(data.tags),
    categories: data.categories || [],
    slug,
    path: `/blog/${slug}`,
    content,
  };
}

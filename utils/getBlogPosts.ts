import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

/**
 * Get all blog posts with metadata
 */
export function getBlogPosts() {
  const files = fs.readdirSync(BLOG_PATH);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(BLOG_PATH, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags,
        categories: data.categories,
        slug: data.slug || file.replace(".mdx", ""),
      };
    });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


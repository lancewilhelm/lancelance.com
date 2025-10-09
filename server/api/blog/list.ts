import { getAllBlogPosts } from "../../utils/blog";

export default defineEventHandler(() => {
  const posts = getAllBlogPosts();
  return posts;
});

import { getBlogPostBySlug } from "../../utils/blog";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required",
    });
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: "Blog post not found",
    });
  }

  return post;
});

import { getRouterParam } from "h3";
import { getProjectBySlug } from "../../utils/projects";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing project slug",
    });
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  return project;
});

import { createError, defineEventHandler, getQuery } from "h3";
import {
  CATEGORIES,
  getAllProjects,
  getProjectsByCategory,
  getProjectsGroupedByCategory,
} from "../../utils/projects";

export default defineEventHandler((event) => {
  const q = getQuery(event);
  const grouped = String(q.grouped ?? "").toLowerCase() === "true";

  if (grouped) {
    return getProjectsGroupedByCategory();
  }

  if (q.category !== undefined && typeof q.category !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Category must appear at most once",
    });
  }
  const category = q.category?.toLowerCase().trim();
  if (category) {
    const matchingCategory = CATEGORIES.find((value) => value === category);
    if (matchingCategory) {
      return getProjectsByCategory(matchingCategory);
    }
    return [];
  }

  return getAllProjects();
});

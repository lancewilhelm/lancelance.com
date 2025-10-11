import { getQuery } from "h3";
import {
  CATEGORIES,
  getAllProjects,
  getProjectsByCategory,
  getProjectsGroupedByCategory,
  type ProjectCategory,
} from "../../utils/projects";

export default defineEventHandler((event) => {
  const q = getQuery(event);
  const grouped = String(q.grouped ?? "").toLowerCase() === "true";
  const category = (q.category as string | undefined)?.toLowerCase().trim();

  if (grouped) {
    return getProjectsGroupedByCategory();
  }

  if (category) {
    if (CATEGORIES.includes(category as ProjectCategory)) {
      return getProjectsByCategory(category as ProjectCategory);
    }
    return [];
  }

  return getAllProjects();
});

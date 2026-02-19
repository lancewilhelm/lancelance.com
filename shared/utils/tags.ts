export function normalizeTagList(input: unknown): string[] {
  const rawValues: string[] = [];

  if (Array.isArray(input)) {
    for (const value of input) {
      if (typeof value === "string") {
        rawValues.push(value);
      }
    }
  } else if (typeof input === "string") {
    rawValues.push(...input.split(","));
  }

  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const rawValue of rawValues) {
    const value = rawValue.trim();
    if (!value) {
      continue;
    }

    const dedupeKey = value.toLowerCase();
    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    normalized.push(value);
  }

  return normalized;
}

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

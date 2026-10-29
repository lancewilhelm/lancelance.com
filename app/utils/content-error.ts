import type { NuxtError } from "#app";

export function contentLoadError(
  error: Pick<NuxtError, "statusCode" | "statusMessage">,
  message: string,
) {
  const status = error.statusCode || 500;
  const staticFallback =
    import.meta.client && !import.meta.dev && status === 404;
  return createError({
    statusCode: staticFallback ? 503 : status,
    statusMessage: staticFallback ? message : error.statusMessage || message,
    fatal: true,
  });
}

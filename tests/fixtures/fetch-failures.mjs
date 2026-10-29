const fetch = globalThis.fetch;
globalThis.fetch = (input, options) => {
  const url =
    typeof input === "string" || input instanceof URL
      ? String(input)
      : input.url;
  if (url.startsWith("https://api.github.com/repos/")) {
    return Promise.resolve(
      new Response(JSON.stringify({ message: "Simulated GitHub outage" }), {
        status: url.toLowerCase().includes("retroboard") ? 503 : 403,
        headers: { "content-type": "application/json" },
      }),
    );
  }
  return fetch(input, options);
};

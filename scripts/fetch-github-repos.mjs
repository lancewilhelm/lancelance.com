import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const REPOS = [
  "lancewilhelm/vue-chatbot",
  "lancewilhelm/delb",
  "lancewilhelm/Staf",
  "lancewilhelm/guage",
  "lancewilhelm/shpacer",
  "lancewilhelm/horizon-extended",
  "lancewilhelm/horizon-extended.nvim",
  "lancewilhelm/lance-skills",
  "lancewilhelm/hfget",
  "lancewilhelm/nvim-dashboard-vscode",
  "lancewilhelm/pingPongBallClock",
  "lancewilhelm/retroboard",
  "lancewilhelm/DroneSpacePiGates",
];

const outPath = path.resolve("src/data/github-repos.json");
const existing = fs.existsSync(outPath)
  ? JSON.parse(fs.readFileSync(outPath, "utf8"))
  : {};
const result = { ...existing };

async function fetchRepo(repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "lancelance.com-build",
      },
    });
    if (res.ok) return await res.json();
  } catch {
    // Fall back to gh CLI when available locally
  }
  try {
    const raw = execFileSync("gh", ["api", `repos/${repo}`], {
      encoding: "utf8",
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

for (const repo of REPOS) {
  const data = await fetchRepo(repo);
  if (data && data.full_name) {
    result[repo] = {
      html_url: data.html_url,
      full_name: data.full_name,
      description: data.description || "",
      language: data.language || "",
      stargazers_count: data.stargazers_count ?? 0,
      forks_count: data.forks_count ?? 0,
    };
    console.log(`fetched ${repo} (${result[repo].stargazers_count}★)`);
  } else {
    console.warn(`kept fallback for ${repo}`);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(`wrote ${outPath}`);

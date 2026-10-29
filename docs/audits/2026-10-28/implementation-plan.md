# Audit fix implementation

## Workflow

- [x] Read the Principles section of the poteto-mode skill.
- [x] Phase A: Frame
- [x] Phase B: Design the workflow
- [x] Phase C: Run the loop
- [x] Restore a reproducible toolchain and a meaningful test gate.
- [x] Correct content parsing, dates, metadata, local assets, and failure states.
- [x] Repair theme recovery, dialogs, keyboard controls, and semantics.
- [x] Bound image and syntax-highlighting payloads without losing originals.
- [x] Update setup, deployment, recovery, and contributor documentation.
- [x] Phase D: Keep the audit trail
- [x] Phase E: Verify and hand back
- [ ] Independently review the diff and evidence, then create a pull request.

## Done predicate

Every F01-F19 finding has an implementation and relevant verification, or an explicit evidence-backed remaining limit. H01 and H02 have failure-injection evidence before a fix is accepted. Lint, typecheck, focused behavior tests, content validation, fresh production build, and browser reading/accessibility/recovery smoke checks pass. The PR includes the audit and a finding-by-finding completion map. Nothing is deployed or merged.

## Rigor and scope

The audit has 19 findings and two conditional investigations across a small Nuxt site. Keep the static deployment and current visual language. Use separate worktrees for parallel implementation slices. Integrate with small Conventional Commits. Pin the Node and pnpm versions used to verify the result. Dependency updates require a fresh install, advisory triage, and full reading-flow verification. Browser verification uses the installed Chromium and a committed Playwright smoke suite; unavailable Cursor-only control/deslop tools are recorded as limits and covered with direct checks.

Throughput checkpoint: three implementation slices at most, plus one coordinating verifier. The existing audit is the pre-change baseline. Do not turn optional style cleanup into a new workstream.

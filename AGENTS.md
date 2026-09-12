# Agent guide

This repository publishes `@mitumba/mobile-ui`, Mitumba's native design and interaction system for React Native and Expo.

## Required reading

1. `CONTRIBUTING.md`
2. `docs/ISSUE_WORKFLOW.md`
3. `docs/DEVELOPMENT_PROGRAM.md`
4. `docs/ARCHITECTURE.md`
5. `docs/COMPATIBILITY.md`
6. `docs/RELEASING.md`
7. The assigned, approved issue and its timeline

## Non-negotiable rules

- Work only from an explicitly assigned issue carrying `status:ready` and `agent:eligible`; verify implementation dependencies are merged into the default branch and decision dependencies have recorded approval before claiming it.
- Use `agent/issue-<number>-<slug>` from current `main`, and close exactly that issue with one implementation PR containing `Closes #<number>`.
- Respect the repository work-in-progress limit; never create an unbounded queue of open PRs or stack a new branch on unmerged work.
- One concern per branch and highly atomic commits.
- TypeScript/TSX only for package implementation.
- No MUI, DOM elements, CSS, direct API calls, routes, app stores, secrets, or payment logic.
- Do not add dependencies without explaining why a primitive cannot solve the requirement.
- Keep exported APIs narrow and documented.
- Add a Changeset for every consumer-visible package change.
- Run `npm run validate` and `npm run verify:package` before requesting review.
- Add a semver-correct Changeset for public behavior and update the slice tracker with release impact.
- When a slice satisfies its tracker, produce a release-readiness recommendation with evidence; do not interpret that recommendation as merge permission.
- A queue-run instruction never includes merge permission. An agent may execute a normal implementation or release PR merge only after a separate, explicit user message names that reviewed PR; recheck its exact head, CI, scope, and readiness immediately before merging.
- Never infer standing merge authority from issue assignment, `status:release-ready`, earlier approvals, tool access, or permission to consume the queue.
- Never run `npm publish`, add an npm token, or edit generated release versions manually. The completed `0.0.0` bootstrap in `docs/RELEASING.md` is historical evidence, not an active exception.
- Do not weaken checks to make a change pass.

## Definition of done

A component is not complete when its ideal screenshot looks correct. It is complete when its content hierarchy, interaction semantics, accessibility, adaptive layout, and relevant loading/error/empty/offline/success/retry states are represented and verified.

# Contributing

## Before changing code

Read, in order:

1. `docs/ISSUE_WORKFLOW.md`
2. `docs/DEVELOPMENT_PROGRAM.md`
3. `docs/ARCHITECTURE.md`
4. `docs/COMPATIBILITY.md`
5. `docs/RELEASING.md`
6. The approved issue being implemented

Automated agents must also comply with `AGENTS.md`. An implementation issue must carry `status:ready` and `agent:eligible`, have every implementation dependency merged into the default branch and every decision dependency approved, and be explicitly assigned in the active session before work begins.

## Workflow

- Branch from current `main` using `agent/issue-<number>-<slug>` for agent work.
- Keep one issue, component, or engineering concern per branch and implementation pull request.
- Include `Closes #<number>` in every implementation pull request; do not use one PR to close a release tracker or unrelated issues.
- Do not stack a new issue branch on an unmerged implementation branch.
- Follow the repository work-in-progress limit in `docs/ISSUE_WORKFLOW.md`.
- Use Conventional Commits with a package or component scope.
- Preserve atomic commits and merge pull requests with normal merge commits.
- Never push directly to `main`.
- Never merge a generated release pull request until its slice tracker is `status:release-ready` and a human explicitly authorizes the merge.

Examples:

```text
feat(button): add compact size
fix(text): preserve consumer accessibility props
docs(release): clarify OIDC bootstrap
chore(deps): update Expo compatibility baseline
```

## Component contract

- Strict TypeScript; no `any`, `@ts-ignore`, or undocumented suppression.
- Named exports only.
- Every public prop has JSDoc.
- Public behavior has a deterministic showcase state.
- Interactive targets are at least 44×44 points.
- Preserve screen-reader meaning, dynamic type, keyboard behavior, reduced motion, and disabled/loading semantics.
- Use `@mitumba/tokens` through a native adapter; do not copy CSS mechanics.
- Keep API calls, routes, app stores, sessions, and payment execution outside this repository.
- New runtime dependencies require compatibility and bundle-impact review.

Automated component tests are intentionally outside this initial scaffold. Introduce the test harness only through explicitly approved work; after it exists, component behavior changes require appropriate automated tests before merge rather than hiding missing tests behind `--passWithNoTests`.

## Required local checks

```bash
npm run validate
npm run verify:package
```

The second command packs the actual npm artifact, installs it into an isolated copy of the Expo showcase, typechecks it, and bundles web, iOS, and Android. Workspace-only success is not sufficient.

## Changesets

Add a Changeset whenever published behavior, API, dependencies, or compatibility changes:

```bash
npm run changeset
```

Showcase-only, documentation-only, and CI-only pull requests do not require one. Never run Changesets versioning or npm publication manually; the sole exception is the one-time organization-owner bootstrap documented in `docs/RELEASING.md`.

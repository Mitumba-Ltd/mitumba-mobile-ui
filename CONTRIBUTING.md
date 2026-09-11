# Contributing

## Before changing code

Read, in order:

1. `AGENTS.md`
2. `docs/ARCHITECTURE.md`
3. `docs/COMPATIBILITY.md`
4. `docs/RELEASING.md`
5. The issue or task being implemented

## Workflow

- Branch from current `main`.
- Use lowercase, hyphenated branches; agent branches start with `agent/`.
- Keep one component or one concern per branch.
- Use Conventional Commits with a package or component scope.
- Preserve atomic commits and merge pull requests with normal merge commits.
- Never push directly to `main`.

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

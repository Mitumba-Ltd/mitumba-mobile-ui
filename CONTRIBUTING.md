# Contributing

## Before changing code

Read, in order:

1. `docs/ISSUE_WORKFLOW.md`
2. `docs/DEVELOPMENT_PROGRAM.md`
3. `docs/ARCHITECTURE.md`
4. `docs/COMPATIBILITY.md`
5. `docs/RELEASING.md`
6. The approved issue being implemented

Automated agents must also comply with `AGENTS.md`. An implementation issue must carry `status:ready` and `agent:eligible`, match an accepted approval record for its current title/body/milestone fingerprint, pass the current program-tracker fingerprint, canonical program-map-hash, and clean recovery gate, belong to an active queue root with a matching activation fingerprint and canonical checklist hash, have every implementation dependency merged into the default branch and every decision dependency backed by a verified decision-closure record, and be explicitly assigned in the active session before work begins.

## Workflow

- Atomically reserve a repository WIP-slot ref at its intent-unique immutable claim-lock commit that binds the active root's canonical checklist hash, then create the one-time `agent/issue-<number>-<claim-id>-<slug>` branch generation from the recorded current `main` SHA through the GitHub reference API before fetching it locally; never reuse a deleted full branch name.
- Never guess away a partial claim, interrupted decision expansion, or orphan ref; reconcile it through the lineage-complete approved candidate action core, immutable execution envelope, server-conditionally safe or create/append/commutative field-preserving non-ref operations, and single shared completion-or-abort terminal protocol. Only the same continuously active attempt may immediately compensate for its own just-created, untouched refs before any issue-branch work commit, PR, or handoff; the required claim-lock object is transaction metadata, not work. Use explicit expected-old-OID leases in one atomic push.
- Expand approved decisions only through predeclared canonical output receipt refs, fully formed new resources, and receipt-backed append-only queue-root checklist entries and `Program map entry` comments; never overwrite an issue, tracker, or milestone from a pre-read when the endpoint supplies no enforced strong conditional write.
- Keep one issue, component, or engineering concern per issue branch and implementation pull request; retain its slot through review.
- Include `Closes #<number>` in every implementation pull request; do not use one PR to close a release tracker or unrelated issues.
- Do not stack a new issue branch on an unmerged implementation branch.
- Follow the repository work-in-progress limit in `docs/ISSUE_WORKFLOW.md`.
- Use Conventional Commits with a package or component scope.
- Preserve atomic commits and merge pull requests with normal merge commits.
- Never push directly to `main`.
- Revalidate the issue and active-tracker fingerprints plus the canonical root-checklist hash immediately before opening the implementation PR.
- Queue consumption never includes merge permission. An agent may execute a normal merge only after a separate direct user message names the reviewed PR and exact head SHA; revalidate contracts and send that SHA as the merge precondition.
- Never merge a generated release pull request until its slice tracker is `status:release-ready` and that separate exact-PR/exact-SHA authorization is given.

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

Showcase-only, documentation-only, and CI-only pull requests do not require one. Never run Changesets versioning or npm publication manually. The completed one-time bootstrap in `docs/RELEASING.md` is historical evidence, not an active exception.

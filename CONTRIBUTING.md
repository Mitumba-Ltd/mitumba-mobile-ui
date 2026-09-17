# Contributing

## Before changing code

Read, in order:

1. `docs/ISSUE_WORKFLOW.md`
2. `docs/DEVELOPMENT_PROGRAM.md`
3. `docs/ARCHITECTURE.md`
4. `docs/COMPATIBILITY.md`
5. `docs/RELEASING.md`
6. The issue you are implementing and its governing tracker

Automated agents must also follow `AGENTS.md`. `docs/ISSUE_WORKFLOW.md` is the process of record; no other document creates a parallel merge or release gate.

An issue is ready to build when it carries `status:ready`, its contract describes the behavior and states to deliver, and its dependencies have merged. If the contract is too thin, write the brief first.

## Workflow

- Reconstruct live state from GitHub before acting: issue labels, dependencies, open pull requests, and CI.
- Branch from the current default-branch tip as `agent/issue-<number>-<slug>`. Keep one concern in flight and never stack on unmerged work.
- Keep one issue per branch and per pull request, with exactly one `Closes #<number>`.
- Make extremely atomic commits — generally one file or one logical change each.
- Put discovered scope in a follow-up issue, not in the current pull request.
- Open the pull request, then obtain an independent semantic review of that exact head. Resolve every confirmed finding and re-run the affected checks; a new push means a new review.
- Merge with a normal merge commit once the head is green, conflict-free, non-draft, and reviewed. Never push to `main` directly, squash, rebase-merge, force-push, or merge a stale or failing head.
- After merging, confirm the merge commit on `main`, the closed issue, and post-merge CI, then delete the branch.

Use Conventional Commits with a package, component, or governance scope. Every human- or agent-authored commit message must end with a blank line and exactly:

```text
Co-authored-by: Sir Stanley <sir.stanley@stanl.ink>
```

Bot-generated commits, including Changesets release commits authored by `github-actions[bot]`, are exempt.

Examples:

```text
feat(button): add compact size
fix(text): preserve consumer accessibility props
docs(workflow): simplify the release gate
chore(deps): update Expo compatibility baseline
```

## Component contract

- Strict TypeScript; no `any`, `@ts-ignore`, or undocumented suppression.
- Named exports only, exported from the package root.
- Every public prop has JSDoc.
- Public behavior has a deterministic showcase state.
- Interactive targets are at least 44 × 44 points.
- Preserve screen-reader meaning, dynamic type, keyboard behavior, reduced motion, and disabled and loading semantics.
- Use `@mitumba/tokens` through a native adapter; do not copy CSS mechanics.
- Keep API calls, routes, app stores, sessions, and payment execution outside this repository.
- New runtime dependencies require accepted compatibility, binary, maintenance, and bundle-impact analysis.

Automated component tests are intentionally outside the current scaffold. Add only tests or test infrastructure that the issue authorizes. Once a harness exists, behavior changes require the appropriate tests rather than hiding missing coverage behind `--passWithNoTests`.

## Required local checks

```bash
npm run validate
npm run verify:package
```

From `apps/showcase`, run `npx expo install --check` when package or Expo configuration may be affected. `verify:package` packs the actual npm artifact, installs it into an isolated copy of the Expo showcase, typechecks it, and bundles web, iOS, and Android. Workspace-only success is insufficient; inspect the diff, declarations, packed allowlist, tarball contents, and the original issue contract.

## Changesets

Add a Changeset whenever published behavior, API, dependencies, or compatibility changes:

```bash
npm run changeset
```

Showcase-only, documentation-only, process-only, and CI-only pull requests do not require one unless they alter published package behavior. Never run Changesets versioning or npm publication manually; GitHub Actions publishes through OIDC.

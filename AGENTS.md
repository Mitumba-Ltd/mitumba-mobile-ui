# Agent guide

This repository publishes `@mitumba/mobile-ui`, Mitumba's native design and interaction system for React Native and Expo.

## Required reading

1. `CONTRIBUTING.md`
2. `docs/ISSUE_WORKFLOW.md`
3. `docs/DEVELOPMENT_PROGRAM.md`
4. `docs/ARCHITECTURE.md`
5. `docs/COMPATIBILITY.md`
6. `docs/RELEASING.md`
7. The selected issue, its timeline, and its governing tracker

## Operating model

`docs/ISSUE_WORKFLOW.md` is the process of record. You own delivery end to end: pick the next eligible concern, write its brief if the contract is thin, implement it, get an independent review, merge it, and cut the release when a slice is complete. Routine merges and releases do not need a fresh approval; stop only for a genuine escalation listed in that document.

Work continues across sessions. A session ending changes nothing about the state of the repository, so reconstruct current state from GitHub and resume the next safe step.

Prefer shipping working code over process overhead. Spend the effort on the component contract, its states, its accessibility, and its platform behavior.

## Non-negotiable rules

- Query GitHub fresh before consequential actions. Do not infer labels, heads, CI status, or mergeability from an earlier read.
- One concern per branch and pull request, with exactly one `Closes #<number>`. Never stack on unmerged work.
- Never commit or push directly to `main`, rewrite published history, force-push, skip hooks or checks, or hide a failed operation.
- Merge only with normal merge commits, only when the exact head is green, conflict-free, non-draft, and reviewed. Never squash or rebase-merge.
- Obtain an independent semantic review of the exact head before merging. Resolve confirmed findings; a new push means a new review. Never present an agent review as human approval.
- Keep commits extremely atomic — generally one file or one logical change. Every human- or agent-authored commit message ends with a blank line followed by exactly:

  `Co-authored-by: Sir Stanley <sir.stanley@stanl.ink>`

  Bot-generated commits, including Changesets release commits authored by `github-actions[bot]`, are exempt.

- Use TypeScript and TSX for package code. No MUI, DOM elements, CSS, direct API calls, routes, app stores, secrets, payment execution, or application business policy.
- Do not add a dependency unless an accepted issue authorizes it and explains why existing primitives cannot serve. Escalate materially impactful unapproved production or native dependencies.
- Keep exported API narrow, named, root-only, and documented. Add a semver-correct Changeset for every consumer-visible change and none for process-only work.
- Add tests or test infrastructure only where the issue authorizes it. Run existing checks; never weaken one to pass.
- Run `npm run validate` and `npm run verify:package`, plus `npx expo install --check` from `apps/showcase` when package or Expo configuration may be affected. A zero exit code alone does not prove the contract is met.
- Publication is GitHub Actions OIDC only. Never run `npm publish`, add a publish token, hand-edit a generated release, or unpublish.

## Definition of done

A component is not complete when a screenshot looks right. It is complete when its content hierarchy, interaction semantics, accessibility, adaptive layout, and relevant loading, error, empty, offline, success, and retry states are represented and verified on the supported native platforms, with deliberate low-end Android behavior.

A process concern is complete when its outcome is internally consistent, its links and syntax validate, contradictory older guidance is removed or superseded, the diff has an independent review, and no package or release scope leaked into it.

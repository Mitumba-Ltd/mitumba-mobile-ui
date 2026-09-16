# Contributing

## Before changing code

Read, in order:

1. `docs/ISSUE_WORKFLOW.md`
2. `docs/DEVELOPMENT_PROGRAM.md`
3. `docs/ARCHITECTURE.md`
4. `docs/COMPATIBILITY.md`
5. `docs/RELEASING.md`
6. The approved issue, its timeline, and any governing tracker

Automated agents must also comply with `AGENTS.md`. `docs/ISSUE_WORKFLOW.md` is the canonical authority and state-machine reference; contributor documents do not create parallel merge or release gates. Checked-in custom profiles are uncredentialed authoring/review roles; the surrounding Kiro Web operator performs authenticated and executable transitions with platform-mediated tools in the managed task sandbox, without treating profile permissions as a Web security boundary.

An executable root child carries `status:ready` and `agent:eligible`, matches its accepted fingerprint, belongs to the active root's canonical checklist and milestone, and has satisfied dependencies. A root-independent `type:process` concern instead follows the documented process lane: no release milestone or root membership, explicit `null` root fields, no package/release-budget impact, and the same tracker #5 recovery and global WIP checks.

## Workflow

- Reconstruct live state from GitHub before acting. Verify the bootstrap anchor and unique immutable active-policy chain (or one predecessor-bound pending successor cutover), tracker #5, the fixed `refs/heads/agent/recovery-active` mutex, the policy-scoped governing root or process-lane record, dependencies, open PRs, CI, claims, and both WIP-slot refs.
- Atomically compare-and-create the closed permanent claim intent/finalization tags with parent `baseSha` and exact `baseSha^{tree}`, the lowest free WIP slot at its immutable lock, and the never-reused `agent/issue-<number>-<claim-id>-<slug>` branch from the recorded default-branch SHA before fetching it locally.
- Preserve inherited pre-activation partial claims, interrupted decisions, durable merge attempts/outcomes, policy activation/supersession/root-v2 records, recovery-abort resolution authority uses/generations/lineage/supersessions/spends, and orphan refs as recovery evidence. Execute only the deterministic exact-state recovery algorithm in `docs/ISSUE_WORKFLOW.md`: atomically contend on its one fixed repository-wide mutex, validate every complete protocol commit envelope, and require exactly one fixed outcome per represented one-shot POST, decision-close PATCH, or normal-merge mutation. Common POST outcomes are closed over resource-observed, authenticated response-rejected, winner-only pre-send-not-sent/request-indeterminate, and original-use-bound expiry-indeterminate. Rejection binds exact status/body bytes, has null resource, and—like the other terminal forms—permits no result/receipt/effect/success/retry or later success adoption; pre-incident/incident abort releases the exact mutex atomically, and stale leases apply nothing. Before the gate is clean or successor preselection is allowed with the mutex absent, every prior start must classify as fully completed or as an abort uniquely suppressed by a later authority/lineage/spend/subject-equal resolution-bound completion; unresolved/current/competing/unsuppressed/malformed starts and conflicting resolutions block, and history remains visible in the base stage. An unchanged aborted subject may restart only from the sole currently qualified lineage head whose exact human-authority use selects a closed safe option from the non-self-referential basis and existing eight dispositions; start atomically creates the same-mutex/start/spend/child-edge transaction. Immutable history is distinct from current qualification; stale or expired unspent generations are superseded, not marked spent. Completion suppresses the subject, while an abort requires distinct fresh durable evidence with a new stable evidence key. Never guess ownership, replay authority, retry a terminal request, or delete a changed ref. Exact ref retirement uses one atomic create/delete transaction with expected-absence and exact-old-OID leases, no plus refspec, and no branch update or permanent-tag deletion.
- Keep one issue, component, or engineering/process concern per branch and pull request. Include exactly one `Closes #<number>` in implementation and process PRs, and retain the issue's slot through review.
- Do not stack a new branch on unmerged work. One operator advances one concern at a time; the repository-wide limit is two independent WIP slots.
- Expand and close decisions only through the canonical lifecycle: immutable plan when needed; one-shot truthful decision-record result; verified expansion or strict no-output effects; one-shot closure-comment result; one fixed issue-close PATCH attempt/outcome; and atomic `decision-closure-result:v1` creation plus exact branch/slot retirement. Recovery's closed output vocabulary covers the exact next plan-derived `issue-create`, `milestone-create`, or `issue-comment-append`, reusing endpoint/scope/resolved request, plan/wire hashes, operation ID, fixed attempt/outcome, and receipt; an issue milestone resolves only from an earlier validated milestone receipt. A normal resource outcome enters `decision-receipt-ready` before the canonical receipt, while session-direct outcome/receipt publication is atomic. Resume uses only the seven exact `decision-*`-prefixed ready substates; the inner hard-predicate substate/transition and outer option substate are byte-identical, and unprefixed aliases are rejected. A sole common response-rejected/not-sent/request-indeterminate/direct-runtime-expiry outcome at record, output, or closure—or a dedicated close terminal—derives closed `decision-stop:v1` and explicit `decision-stopped`, preserving the exact successful prefix and later absence while ownership remains live. Only recovery `abandon-decision` accepts it—not `resume`—and its result set binds the stop source plus later abandonment; it leaves the issue unclosed and never satisfies `validateDecisionClosure`. Endpoint actor/App attribution proves execution provenance, never human authority. A decision dependency is satisfied only by `validateDecisionClosure`; issue #16 is the sole exact predecessor adapter. Never overwrite a tracker from a stale pre-read, invent unavailable provenance, or treat a record, expansion completion, closure comment, issue state, or label alone as closure.
- Make in-scope technical choices from evidence and record them truthfully under `standing-policy`. A genuine escalation accepts only the domain's exact positive-channel `durable-independent-human` or current-runtime one-use `session-direct-active-kiro-user` variant; its exact statement bytes bind the subject and its expected-absent authority-use ref is atomically consumed with the first domain mutation. Ordinary comments and execution provenance never substitute. A protected authority-boundary process PR separately requires a durable substantive result and a fresh exact-merge direct instruction: their OID-only subject fields are `core.headSha` and `request.core.headSha`, while complete core/request hashes remain bound, and successful merge outcome/result/containment publication is atomic in the receiving runtime. Use `human-required` only for the canonical [genuine escalations](docs/ISSUE_WORKFLOW.md#genuine-escalation).
- Add discovered scope to a follow-up issue rather than the current PR.
- Revalidate issue, root/process, checklist/program-map, and exact-head state before opening or updating a PR.
- Push and open the PR with review marked pending. Have the outer operator construct and cryptographically verify the canonical `semantic-review-bundle:v1`, then provide its manifest and every exact deterministic artifact attachment to an independent read-only reviewer for semantic inspection of the contract/patch/evidence, exact head/current default-branch tip, non-null tested merge commit/tree, and current exact-base guard or truthful review-only absence. Record outer verification and the reviewer verdict separately; the reviewer does not claim unavailable Git/API/hash computation. Resolve every confirmed finding. Any code/policy push, base advance, changed merge result, guard change, or changed bundle artifact requires a fresh bundle and verdict.
- Preserve atomic commits and merge PRs only with normal merge commits. Autonomous merge requires a non-null reviewed tested integration and a live strict required-status-check guard that the authenticated executor cannot bypass; the guard—not a final read—must reject base drift. Record the one `PUT` through fixed attempt/outcome/result refs. Never push directly to `main`, squash merge, rebase merge, force-push, auto-merge as bypass, retry an unknown request, bypass checks/protection, or merge a stale, failing, conflicting, or unreviewed integration.
- Under activated standing authority, an operator may normally merge only after all exact reviewed identities and the non-bypassable server guard remain current; missing protection/capability escalates rather than weakening the gate. Changed integration or guard evidence requires fresh validation/review, not routine reauthorization.
- A protected policy merge remains a candidate successor under its predecessor. Finish or abandon existing predecessor-bound work and start nothing new. Enumerate `policy-transition-pending` only under `preSelectionPolicyQuiescence`: the live mutex/current start are absent and every permanent prior start is either fully completed or its abort is uniquely suppressed by a later valid resolution-bound completion; unresolved, competing, unsuppressed, malformed, or conflicting-resolution history blocks and is never hidden. After selection, require exact-bound-mutex/start `selectedPolicyTransitionQuiescence` through quarantine, action, and pre-transaction validation, retaining and revalidating the byte-identical captured terminal-history set while rejecting changes/new starts. One atomic terminal transaction creates successor activation, predecessor supersession, zero/one unchanged-root `root-activation:v2`, recovery result, and terminal while deleting the exact old mutex; rejection is a no-op that leaves the predecessor active. The terminal-only `policy-transition-completed` state never re-enters enumeration. No mutable current-policy ref/settings mutation, in-flight identity migration, or bootstrap replay exists.
- Generated release PRs remain open until the slice is `status:release-ready`, their exact head passes release audit and independent semantic review, and every normal-merge precondition is fresh. GitHub Actions alone publishes through OIDC.

Use Conventional Commits with a package, component, or governance scope. Every human- or agent-authored commit message must end with a blank line and exactly:

```text
Co-authored-by: Sir Stanley <sir.stanley@stanl.ink>
```

Bot-generated commits, including Changesets release commits authored by `github-actions[bot]`, are exempt.

Examples:

```text
feat(button): add compact size
fix(text): preserve consumer accessibility props
docs(workflow): define process claim lane
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
- New runtime dependencies require accepted compatibility, binary, maintenance, and bundle-impact analysis.

Automated component tests are intentionally outside this initial scaffold. Add only tests or test infrastructure already authorized by the issue. After a harness exists, behavior changes require the appropriate authorized tests rather than hiding missing coverage behind `--passWithNoTests`.

## Required local checks

```bash
npm run validate
npm run verify:package
```

From `apps/showcase`, run `npx expo install --check` when package or Expo configuration may be affected. `verify:package` packs the actual npm artifact, installs it into an isolated copy of the Expo showcase, typechecks it, and bundles web, iOS, and Android. Workspace-only success is insufficient; inspect the diff, declarations, packed allowlist, tarball contents, and original issue contract.

## Changesets

Add a Changeset whenever published behavior, API, dependencies, or compatibility changes:

```bash
npm run changeset
```

Showcase-only, documentation-only, process-only, and CI-only pull requests do not require one unless they alter published package behavior. Never run Changesets versioning or npm publication manually. The completed one-time package reservation described in `docs/RELEASING.md` is historical evidence, not an active exception.

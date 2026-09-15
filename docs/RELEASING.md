# Releasing `@mitumba/mobile-ui`

Releases use Changesets and npm trusted publishing through GitHub Actions OIDC. No long-lived npm publication token belongs in GitHub secrets.

## Current published baseline

`@mitumba/mobile-ui@0.1.0` is the supported `latest` release. It was published from `main` through `.github/workflows/publish.yml` with npm provenance on September 11, 2026.

The one-time package reservation `0.0.0` remains deprecated under the `bootstrap` tag. The bootstrap is complete and must never be repeated.

## Authority and release ownership

`docs/ISSUE_WORKFLOW.md` is the canonical release state machine. After its bootstrap anchor and unique immutable active-policy chain are verified, the operator may audit and normally merge a clean implementation or generated release PR without routine reauthorization only when its exact head/base/non-null tested integration and current non-bypassable server exact-base guard remain bound to the outer-operator-verified canonical bundle/artifacts and independent byte-complete semantic verdict. A protected successor policy merge blocks new release work until predecessor-bound work is terminal. Only absent-mutex `preSelectionPolicyQuiescence` can enumerate `policy-transition-pending`; once selected, exact-bound-mutex/start `selectedPolicyTransitionQuiescence` governs through one all-or-nothing transaction creating successor activation/supersession, optional unchanged-root `root-activation:v2`, recovery result, and terminal while deleting the exact mutex. Rejection leaves the predecessor active, and terminal-only `policy-transition-completed` never re-enters release selection. Every merge uses the fixed attempt/outcome/result operation and normal method `merge`.

GitHub Actions owns publication. The operator owns audit, guarded merge-operation recording, workflow observation, registry/provenance verification, evidence, tracker finalization, and queue continuation. A head change, default-branch advance, changed tested integration, exact-base-guard change, or changed bundle artifact invalidates validation and semantic-review evidence, not `standing-policy`; it never preserves or revives an expired `session-direct-active-kiro-user` instruction. A missing or unprovable non-bypassable guard stops under the existing capability/permission escalation. Authority is accepted only through the canonical disjoint union: routine `standing-policy`, positive-channel `durable-independent-human`, or exact-subject/decision, one-use, same-runtime `session-direct-active-kiro-user`; every human statement binds the closed subject bytes and atomically consumes the expected-absent authority-use ref with its domain's first mutation. An ordinary comment or API `User` attribution is never durable human provenance. Apply `human-required` only for a canonical [genuine escalation](ISSUE_WORKFLOW.md#genuine-escalation).

## Slice-based release flow

1. Activate the earliest dependency-eligible release tracker only when its current title/body/milestone fingerprint and canonical checklist hash are already authorized by `standing-policy`; use `root-activation:v2` keyed by the unique active policy SHA. This root-activation protocol has no generic human-authority shortcut. A genuine escalation first completes through the specific protected-process, canonical-decision, or recovery-resolution schema whose exact statement and one-use record validate; an ordinary comment is never durable human provenance.
2. Assign every public-change issue to that milestone and tracker, require its own accepted fingerprint, and preserve the approved capability budget.
3. Add a semver-correct Changeset to every implementation PR that changes public behavior, API, dependencies, or compatibility.
4. Open each implementation PR with review pending, have the outer operator construct and verify its canonical `semantic-review-bundle:v1`, deliver every deterministic artifact attachment byte to the independent read-only reviewer, obtain semantic review bound to that exact contract/patch/evidence and head/current base/non-null tested integration/current guard or truthful review-only absence, and normally merge only after every current contract, CI, package, trailer, non-bypassable exact-base, and fixed-operation precondition passes.
5. Verify the merge commit on `main`, issue closure, release-impact evidence, and post-merge CI before retiring its WIP slot and continuing.
6. Let the `Publish` workflow open or update `chore: release packages` from accumulated Changesets. Do not treat its existence as release readiness.
7. Keep the generated PR open while canonical slice issues remain incomplete.
8. Audit the complete slice and generated PR's exact head/current base/non-null tested integration/current strict guard; verify and record its canonical review-bundle hash, expected semantic version, and evidence, then apply `status:release-ready` without a routine `human-required` label.
9. Requery that exact integration/guard and execute the one fixed normal-merge attempt/outcome/result operation with expected head SHA and method `merge`.
10. Monitor the resulting `Publish` run to a terminal conclusion and verify the registry package, dist-tag, provenance, and source commit before marking the slice released.

Changesets does not wait for GitHub milestones. A generated release PR appearing after the first qualifying implementation merge is expected. An automation-created release PR may show `action_required` with no PR-event jobs because an automation-created event did not retrigger CI; that status alone is not a release blocker when the preceding feature PR and current `main` workflows passed and the generated diff is purely mechanical. The exact release candidate still requires the full local, artifact, semantic, and workflow audit below.

Do not edit package versions or changelogs manually. Do not run Changesets versioning or `npm publish` locally.

## Exact-candidate release audit

Before applying `status:release-ready`, verify and record:

- tracker #5's current fingerprint/program-map/recovery state, including the bootstrap anchor and unique active-policy chain or predecessor-bound pending cutover, fixed mutex, proof that no unsuppressed aborted subject, currently qualified resolution, malformed/forked lineage, or unsuperseded stale/expired generation passes the gate, plus the active policy-scoped root fingerprint/checklist activation;
- every canonical seed/receipt-backed issue, accepted fingerprint, dependency, normal-merged implementation PR, decision that passes `validateDecisionClosure` through one canonical `decision-closure-result:v1` or the sole exact issue #16 adapter, and deferral;
- one coherent capability within the accepted component and foundation budget;
- every public change's Changeset and the generated SemVer/changelog result;
- exact release PR number, head SHA, current default-branch tip/base SHA, non-null tested merge-ref/tree SHA, exact-base guard projection, source branch, mergeability, author, and complete diff;
- public exports, generated declarations, consumer documentation, deterministic showcase states, compatibility, and license files;
- packed-file allowlist, tarball contents, package metadata, repository URL, and absence of credentials or app-only content;
- `npm run validate` at the candidate SHA;
- `npm run verify:package` at the candidate SHA;
- `npx expo install --check` from `apps/showcase`;
- required implementation, `main`, CI, and Publish-preparation workflows;
- an independent `semantic-review:v1` verdict of `pass` after byte-complete semantic inspection, bound to the exact release head and the outer operator's verified `semantic-review-bundle:v1` manifest/hash/artifacts; and
- visible later issues for every deferral or follow-up.

The release-audit record binds all evidence, the unique active-policy chain terminal, expected package version/dist-tag, current fingerprints/hashes, exact PR head, reviewed default-branch tip, non-null tested integration, exact-base guard, canonical review-bundle hash/artifact identities, reviewer identity/type, findings/resolutions, residual risks, and UTC/comment identity. Any head, base, tested-integration, guard, or bundle-artifact change requires a new audit and semantic review.

## Normal release merge

Immediately before merge, freshly requery every audit fact, including the PR head, default-branch tip, non-null tested integration, required check runs, protection/ruleset state, and executor permission/bypass facts. Merge only when the reviewed integration and canonical bundle remain current, conflict-free, non-draft, green under applicable checks, mechanically scoped to the audited Changesets result, free of unresolved recovery/escalation state, and protected by strict required-status-check enforcement that the authenticated executor cannot bypass. A final read is not an atomic base guard; the live server rule must reject base drift.

Compare-and-create the fixed merge-attempt ref before the one GitHub merge `PUT`; only its winning invocation may send the exact head SHA with method `merge`. Persist exactly one fixed observed, rejected, winner-only pre-send-not-sent, or request-indeterminate outcome and the verified merge result only when successful. Not-sent/indeterminate/rejected outcomes have no result, and the same logical request is never retried. Never squash, rebase, bypass protection, fabricate approval, enable auto-merge as a bypass, update `main` directly, or merge a stale/failing/conflicting/unreviewed release candidate. If the strict non-bypassable guard is absent or unprovable, stop under the existing capability/permission escalation. Verify the result's exact reviewed base/head parents, tested tree, and `main` containment before treating the transaction as complete.

## OIDC publication and package verification

After the release merge:

1. identify the `Publish` workflow run caused by the verified release merge/default-branch SHA;
2. monitor every relevant job through a terminal conclusion;
3. verify GitHub Actions used `id-token: write`, the trusted-publishing path, and npm provenance without a token fallback;
4. query npm for the exact published version and intended dist-tag, normally `latest`;
5. verify the installable package/tarball metadata, contents, repository identity, integrity when exposed, and version;
6. verify the npm provenance attestation links the package to `Mitumba-Ltd/mitumba-mobile-ui`, `publish.yml`, and the expected source/release commit;
7. record package version, dist-tag, npm/provenance URLs, workflow run/jobs, release PR/head/merge commit, source commit, and verification time on the tracker; and
8. replace `status:release-ready` with `status:released`, close the tracker and milestone, verify the next dependency, and continue the operator loop.

A merged release PR, a local version string, or a successful workflow without registry/provenance verification is not publication completion.

## Failure handling

On the first CI, packaging, or publication failure, preserve exact logs and observed registry state, apply `status:blocked`, and open or resume one bounded repair concern when a uniquely safe repository change can address it. Do not add `human-required` for a routine diagnosable repair. Revalidate the repaired exact head through the complete audit.

Stop and apply `human-required` only when failure reaches the canonical escalation boundary, including repeated failure after bounded safe repair, credentials or organization permissions, npm/package ownership, legal/licensing/publication ownership, destructive rollback, release deletion/unpublishing, or ambiguous repository/publication state.

Never add `NPM_TOKEN`, publish from a fork, bypass validation/artifact/provenance checks, manually edit the generated release commit, or locally publish to recover.

## Trusted publisher identity

The configured npm trusted publisher is:

```text
Organization or user: Mitumba-Ltd
Repository:           mitumba-mobile-ui
Workflow filename:    publish.yml
Environment:          leave blank
Allowed action:       npm publish
```

The workflow filename is only `publish.yml`, not `.github/workflows/publish.yml`. Values are case-sensitive. The npm package must retain two-factor-authentication-required, token-disallowed publication access.

The repository and package use the MIT License. The release audit confirms that `release-license.json` contains `MIT`, both `LICENSE` files are identical and non-empty, `packages/ui/package.json` declares `"license": "MIT"`, and the packed artifact includes the package license.

## Official references

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [npm organization-scoped public packages](https://docs.npmjs.com/creating-and-publishing-an-organization-scoped-package)
- [npm trust CLI](https://docs.npmjs.com/cli/v12/commands/npm-trust)

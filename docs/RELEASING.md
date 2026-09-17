# Releasing `@mitumba/mobile-ui`

Releases use Changesets and npm trusted publishing through GitHub Actions OIDC. No long-lived npm publication token belongs in GitHub secrets.

## Current published baseline

`@mitumba/mobile-ui@0.1.0` is the supported `latest` release. It was published from `main` through `.github/workflows/publish.yml` with npm provenance on September 11, 2026.

The one-time package reservation `0.0.0` remains deprecated under the `bootstrap` tag. The bootstrap is complete and must never be repeated.

## Release ownership

`docs/ISSUE_WORKFLOW.md` is the process of record. The operator decides when a slice is complete, audits the exact release candidate, obtains an independent review of that head, merges it with a normal merge commit, monitors publication, and verifies the result. Routine reauthorization is not required.

GitHub Actions owns publication through npm trusted publishing. A head change, default-branch advance, or new commit invalidates the earlier validation and review evidence for that candidate, so audit and review the new head instead. Apply `human-required` only for a [genuine escalation](ISSUE_WORKFLOW.md#genuine-escalation).

## Slice-based release flow

1. Work the earliest dependency-eligible release tracker and keep its child issues inside the approved capability budget.
2. Assign every public-change issue to that milestone and tracker.
3. Add a semver-correct Changeset to every implementation PR that changes public behavior, API, dependencies, or compatibility.
4. Open each implementation PR, obtain an independent review of its exact head, and merge with a normal merge commit once CI, packaging, and the trailer requirement all pass.
5. Verify the merge commit on `main`, issue closure, release impact, and post-merge CI, then delete the branch and continue.
6. Let the `Publish` workflow open or update `chore: release packages` from accumulated Changesets. Its existence is not release readiness.
7. Keep the generated PR open while slice issues remain incomplete, so the slice ships under one version.
8. Audit the complete slice and the generated PR's exact head, record the expected version and evidence, then apply `status:release-ready`.
9. Merge that exact head with a normal merge commit, sending the expected head SHA.
10. Monitor the resulting `Publish` run to a terminal conclusion and verify the registry package, dist-tag, provenance, and source commit before marking the slice released.

Changesets does not wait for GitHub milestones. A generated release PR appearing after the first qualifying implementation merge is expected. An automation-created release PR may show `action_required` with no PR-event jobs because an automation-created event did not retrigger CI; that status alone is not a release blocker when the preceding feature PR and current `main` workflows passed and the generated diff is purely mechanical. The exact release candidate still requires the full local, artifact, semantic, and workflow audit below.

Do not edit package versions or changelogs manually. Do not run Changesets versioning or `npm publish` locally.

## Exact-candidate release audit

Before applying `status:release-ready`, verify and record:

- every slice issue closed by a merged implementation PR, every decision recorded, and every deferral tracked in a visible follow-up issue;
- one coherent capability within the accepted component and foundation budget;
- every public change's Changeset and the generated SemVer and changelog result;
- the release PR number, head SHA, current default-branch tip, mergeability, and complete diff, confirming the diff is only the mechanical version, changelog, and consumed-Changeset result;
- public exports, generated declarations, consumer documentation, deterministic showcase states, compatibility, and license files;
- packed-file allowlist, tarball contents, package metadata, repository URL, and the absence of credentials or app-only content;
- `npm run validate` at the candidate SHA;
- `npm run verify:package` at the candidate SHA;
- `npx expo install --check` from `apps/showcase`;
- the implementation, `main`, and CI workflows for that candidate; and
- an independent review of the exact release head.

Record the evidence, the expected version and dist-tag, the exact head, the reviewer, findings and resolutions, and residual risks on the tracker. Any new commit on the candidate requires a fresh audit and review.

## Release merge

Immediately before merging, requery the PR head, the default-branch tip, mergeability, and the required checks. Merge only when the reviewed head is current, conflict-free, non-draft, green, and mechanically scoped to the audited Changesets result, using a normal merge commit with the expected head SHA.

Never squash, rebase, fabricate approval, enable auto-merge as a bypass, update `main` directly, or merge a stale, failing, conflicting, or unreviewed release candidate. If the merge is rejected because the head moved, re-audit and re-review the new head instead of retrying blind. Verify the merge commit's reviewed base and head parents and its containment in `main` before treating the release as merged.

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

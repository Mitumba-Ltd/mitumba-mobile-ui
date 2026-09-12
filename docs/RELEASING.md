# Releasing `@mitumba/mobile-ui`

Releases use Changesets and npm trusted publishing through GitHub Actions OIDC. No long-lived npm publication token belongs in GitHub secrets.

## Current published baseline

`@mitumba/mobile-ui@0.1.0` is the supported `latest` release. It was published from `main` through `.github/workflows/publish.yml` with npm provenance on September 11, 2026.

The one-time package reservation `0.0.0` remains deprecated under the `bootstrap` tag. The bootstrap is complete and must never be repeated.

## Slice-based release flow

1. Activate the earliest dependency-eligible release tracker only after an accepted approval record binds its current title/body/milestone fingerprint.
2. Assign each public-change issue to that milestone and tracker, and require its own accepted contract fingerprint.
3. Add a semver-correct Changeset to every implementation PR that changes public behavior, API, dependencies, or compatibility.
4. Merge each reviewed implementation PR normally only after CI, continuous issue/tracker fingerprint checks, and a separate direct active-user authorization naming its exact head SHA.
5. The `Publish` workflow opens or updates `chore: release packages` from the accumulated Changesets.
6. Keep that generated release PR open while required issues remain in the milestone.
7. The mobile UI engineer audits the completed slice and posts a proposed version plus release-readiness evidence on the tracker.
8. Apply `status:release-ready` only when every tracker gate passes.
9. A later, separate direct instruction from the active user names and authorizes the exact reviewed release PR and head SHA for a normal expected-SHA merge.
10. The next `Publish` run builds, verifies, and publishes through OIDC with npm provenance.

Changesets does not wait for GitHub milestones. A generated release PR appearing after the first qualifying implementation merge is expected and is not evidence that the slice is ready.

Do not edit package versions or changelogs manually. Do not run Changesets versioning or `npm publish` locally.

## Release-readiness gate

Before recommending a release, verify:

- the active tracker fingerprint still matches its accepted activation record, every required issue fingerprint still matches its accepted approval, every implementation issue is closed by its own reviewed normal-merged PR, and every decision issue has a verified decision-closure record;
- the result is still one coherent capability within the approved release budget;
- every public change has the correct Changeset and the generated semantic version is expected;
- public exports, generated declarations, consumer documentation, and deterministic showcase states are complete;
- `npm run validate` succeeds at the candidate SHA;
- `npm run verify:package` succeeds and the packed artifact contains only approved files;
- `npx expo install --check` succeeds from `apps/showcase`;
- CI and release-preparation workflows are green;
- deferred or follow-up work remains visible in later issues;
- no dependency, test, compatibility, credential, or scope approval is unresolved.

The agent decides whether the evidence supports a release recommendation and proposes the semantic version. It applies `status:release-ready` plus `human-required` only after the technical audit. Direct active-user merge authorization is a subsequent gate and is not part of technical readiness. Queue execution never includes merge permission; only a later, separate user message naming the reviewed release PR and exact head SHA may authorize an agent to execute its normal merge. The agent must revalidate tracker/issue fingerprints and send that SHA as the merge precondition; any head change requires fresh authorization. GitHub Actions—not the agent—performs publication.

## Post-publication transition

- On success, record the actual npm version, provenance URL, workflow run, and release commit on the slice tracker. Apply `status:released`, remove `human-required`, and close the tracker and milestone.
- On failure, apply `status:blocked` plus `human-required` and keep the tracker and milestone open. Diagnose and repair through a bounded issue PR; do not publish locally or bypass OIDC.
- Do not activate a dependent milestone until the preceding release is either verifiably published or the dependency is explicitly redesigned and approved.

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

The repository and package use the MIT License. The release gate confirms that `release-license.json` contains `MIT`, both `LICENSE` files are identical and non-empty, `packages/ui/package.json` declares `"license": "MIT"`, and the packed artifact includes the package license.

## Failure safety

- Never add `NPM_TOKEN` as a fallback.
- Never publish from a fork; npm validates repository identity.
- Never bypass validation, artifact verification, provenance, or the issue/milestone hold.
- If authentication fails, check the exact repository and workflow filename, `id-token: write`, GitHub-hosted runner, and package `repository.url`.
- If package verification fails, fix the package or showcase in a new reviewed issue PR; do not edit the generated release commit.
- If a release PR contains unrelated capability slices, do not merge it. Correct the milestone plan and defer or separate scope first.

## Official references

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [npm organization-scoped public packages](https://docs.npmjs.com/creating-and-publishing-an-organization-scoped-package)
- [npm trust CLI](https://docs.npmjs.com/cli/v12/commands/npm-trust)

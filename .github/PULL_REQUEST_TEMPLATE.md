## Closing contract

Closes #<!-- exactly one issue; use "not applicable" only for a generated release PR -->

- PR kind: implementation / process / generated release
- Release-budget impact: <!-- public components before → after, or zero for process work -->
- Dependencies merged into the default branch: yes / no / not applicable

## Contract delivered

<!-- The user problem and the bounded package or process responsibility delivered. -->

### Non-goals preserved

<!-- App-owned, deferred, or otherwise out-of-scope responsibilities. -->

## Native quality evidence

<!-- Complete the relevant rows; use "not applicable" with a reason for process-only work. -->

- Relevant states represented:
- Screen-reader name/role/state/value/actions:
- Dynamic-type and large-font behavior:
- Touch targets and focus order:
- Reduced-motion behavior:
- iOS/Android differences:
- Safe-area, keyboard, and Android-back behavior:
- Low-end Android render/list/image/animation cost:

## Package impact

- [ ] Public types and props have JSDoc, or not applicable
- [ ] Root exports and consumer documentation are complete, or not applicable
- [ ] Deterministic Expo showcase states are included, or not applicable
- [ ] A semver-correct Changeset is included, or a no-Changeset rationale is given below
- [ ] Compatibility impact is documented
- [ ] Any new dependency was authorized with necessity, bundle, binary, and Expo analysis
- [ ] Tests were authorized by the issue, or none were added
- [ ] Affected Markdown links and workflow/config syntax were validated

Changeset or no-Changeset rationale:

## Verification

- [ ] `npm run validate`
- [ ] `npm run verify:package`
- [ ] `npx expo install --check` from `apps/showcase`, when relevant
- [ ] `git diff --check`
- [ ] Public exports and generated declarations inspected
- [ ] Packed allowlist and tarball contents inspected
- [ ] No credentials, app-only logic, or unrelated scope included

Exact commands, results, and anything not run:

## Review

- Reviewer and review scope:
- Findings and how each was resolved:
- Verdict: pass / revise
- [ ] The review covered the exact head being merged, and no push followed it
- [ ] No agent review is presented as human approval

## Merge safety

- [ ] This PR closes exactly one concern, or is the identified generated release PR
- [ ] Head is green, conflict-free, non-draft, and current with the reviewed base
- [ ] Merge will use a normal merge commit with the expected head SHA
- [ ] Squash, rebase-merge, force-push, and direct `main` updates are not used
- [ ] Follow-up scope is tracked in separate issues
- [ ] Publication remains GitHub Actions OIDC only

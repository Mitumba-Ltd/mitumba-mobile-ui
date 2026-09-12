## Closing issue

Closes #<!-- exactly one atomic implementation issue -->

- Milestone/slice:
- Implementation dependencies are merged into the default branch and present in this branch base: yes / no / not applicable
- Decision dependencies have an approved record: yes / no / not applicable
- Release-budget impact: <!-- public components before → after; explain non-component work -->

## Contract delivered

<!-- Explain the user problem and the bounded native UI responsibility implemented. -->

### Non-goals preserved

<!-- Confirm what remains app-owned or was deliberately deferred. -->

## Native quality evidence

- Relevant states represented:
- Screen-reader name/role/state/value/actions:
- Dynamic-type and large-font behavior:
- Touch targets and focus order:
- Reduced-motion behavior:
- iOS/Android differences:
- Safe-area, keyboard, and Android-back behavior, if applicable:
- Low-end Android render/list/image/animation considerations:

## Package impact

- [ ] Public package behavior or API changed
- [ ] Public types and props have JSDoc
- [ ] Local and root exports are complete
- [ ] Consumer documentation is updated
- [ ] Deterministic Expo showcase states are included
- [ ] Semver-correct Changeset is added, or the reason it is not required is stated below
- [ ] Expo/React Native compatibility changed and is documented
- [ ] A new dependency was explicitly approved with bundle, binary, Expo, maintenance, and no-dependency analysis
- [ ] Tests or test infrastructure were explicitly approved, or none were added

Changeset rationale:

## Verification

- [ ] `npm run validate`
- [ ] `npm run verify:package`
- [ ] `npx expo install --check` from `apps/showcase`
- [ ] Public exports and generated declarations were inspected
- [ ] Packed-file allowlist and tarball contents were inspected
- [ ] No credentials, app-only logic, or restricted assets are included

Exact commands, results, and checks not run:

## Queue and release safety

- [ ] This PR closes exactly one atomic issue
- [ ] This branch starts from `main` rather than another unmerged issue branch
- [ ] The repository work-in-progress limit remains satisfied
- [ ] Follow-up scope was opened as another issue instead of added silently
- [ ] This is not a generated release PR, or its slice is explicitly `status:release-ready`
- [ ] No merge or publication is implied by implementation completion

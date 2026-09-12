# Issue-driven engineering workflow

## Purpose

GitHub issues are executable engineering contracts for `@mitumba/mobile-ui`. Every implementation pull request closes one approved atomic issue, and every planned release is represented by a milestone plus a release-slice tracker.

This workflow gives a dedicated Kiro Web session a durable queue while preserving human review, small releases, and package safety. A custom agent is not a daemon: it works only while invoked in an active session and does not wake itself after that session ends.

## Work hierarchy

1. **Program tracker:** records the app-enablement outcome, roadmap checkpoints, and every release-slice tracker.
2. **Milestone and slice tracker:** define one coherent release capability, its required issues, dependency order, release budget, deferred scope, and release hold.
3. **Atomic issue:** defines one component, one foundation policy, one bug, or one design decision.
4. **Implementation pull request:** implements and closes exactly one atomic issue with `Closes #<issue>`.
5. **Generated release pull request:** accumulates Changesets for the active slice and remains unmerged until the slice tracker is release-ready.

The roadmap sets direction. Issues contain approved executable scope. Neither one grants permission to merge or publish.

## Queue bootstrap and source of truth

The live queue is bootstrapped with the documented labels, one milestone per seeded slice, [program tracker #5](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/5), [slice trackers #6–#15](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues?q=is%3Aissue%20label%3A%22type%3Arelease%22), known atomic issues, and design-gate issues for unresolved slices. `docs/DEVELOPMENT_PROGRAM.md` records the canonical tracker and milestone links.

A fresh session must query GitHub rather than infer state from this document. If a documented label, milestone, or tracker is missing, duplicated, or contradictory, stop and request repair instead of creating a parallel queue. New future slices enter through an approved design issue and release tracker, not ad hoc implementation issues.

## Issue types

- `type:component`: one public primitive, component, or pattern.
- `type:foundation`: one native policy or token-adaptation concern.
- `type:decision`: a bounded design choice or slice definition; it creates implementation issues after approval instead of hiding implementation in the decision.
- `type:bug`: one reproducible defect or regression.
- `type:release`: a non-implementation release-slice tracker that ends in verified OIDC publication.
- `type:discovery`: a non-publication umbrella that ends when its child discoveries are promoted or explicitly deferred.
- `type:program`: the non-implementation app-enablement tracker.

An issue is detailed enough only when its problem, non-goals, dependencies, state matrix, semantic API or decision deliverable, native design, accessibility behavior, platform differences, performance risks, acceptance criteria, showcase evidence, and release impact are explicit where relevant.

## Queue labels

### Contract state

- `status:needs-brief`: the issue is incomplete and must not be implemented.
- `status:needs-decision`: a named human or product decision is unresolved.
- `status:ready`: the contract is complete and may be assigned.
- `status:in-progress`: one agent or human is actively implementing it.
- `status:in-review`: its implementation pull request is open.
- `status:blocked`: a dependency or external condition prevents progress.
- `status:release-ready`: the slice passed the technical release-readiness audit and awaits human authorization.
- `status:released`: OIDC publication succeeded and the release tracker/milestone can be retired.
- `status:complete`: a non-publication tracker satisfied its closure contract and can be retired.

Exactly one contract-state label should be present.

### Agent state

- `agent:eligible`: a dedicated agent session may select the issue after checking dependencies.
- `agent:claimed`: one active session owns the issue; no second worker may start it.
- `human-required`: implementation or progress requires a decision or authorization that cannot be inferred.

`agent:eligible` means queue eligibility, not permission to merge an implementation or release pull request. Assignment in the dedicated session is implementation authorization for the bounded issue only.

### Architecture and governance

Use one `layer:*` label for implementation work. Add `needs-changeset` for expected published behavior, `dependency-review` when a native dependency is proposed, and `testing-approved` only when the task explicitly authorizes test infrastructure or tests.

## Contract approval

Before marking an issue `status:ready`:

1. confirm it belongs to the earliest active milestone whose dependencies allow progress;
2. confirm one issue maps to one component or concern and one implementation PR;
3. replace speculative API claims with an explicit design decision when evidence is missing;
4. list blocking issues; for implementation blockers, verify the linked closing PR is merged into the default branch and its merge commit is present in the intended branch base; for decision blockers, verify the approved decision comment and closure reason;
5. confirm the state, accessibility, platform, and low-end Android contracts;
6. confirm the work fits the slice release budget;
7. obtain explicit approval for any dependency, test work, compatibility expansion, or roadmap movement.

Later milestones may contain `status:needs-brief` design issues, but their speculative component issues must not be marked agent-eligible.

## Delegated technical choices

A `status:ready` implementation issue may explicitly delegate a bounded technical API choice to the principal mobile UI engineer without a separate human decision only when:

- the user outcome, scope, non-goals, architecture layer, state/accessibility contract, and release budget are fixed;
- the issue names the alternatives and explicitly authorizes the agent to select the narrowest option;
- the choice introduces no dependency, native module, test infrastructure, compatibility break, application responsibility, or roadmap expansion;
- the agent records alternatives, rationale, API impact, and deferrals in the implementation PR before code review;
- any option that violates those limits moves the issue to `status:needs-decision` plus `human-required` instead of being selected.

This is engineering delegation, not permission to invent product behavior. Without the explicit delegation language, a materially unsettled public or shared API requires the design-decision lifecycle.

## Design-decision lifecycle

Design issues feed the queue without pretending that a decision is an implementation PR:

1. complete the research contract, then mark the issue `status:ready` and `agent:eligible` for an explicitly assigned design pass;
2. the agent claims it, gathers evidence, and posts one bounded proposal with alternatives and deferrals;
3. the agent removes `agent:claimed` and `agent:eligible`, applies `status:needs-decision` plus `human-required`, and stops;
4. a human approval comment names the selected capability, public responsibilities, dependencies, release budget, and deferred scope;
5. an explicitly resumed agent creates one `status:needs-brief` atomic issue per approved concern and updates the slice tracker and milestone;
6. those new issues receive `status:ready` and `agent:eligible` only after individual contract review;
7. close the design issue from its approved decision record without an implementation PR, then remove `human-required`.

A queue-run authorization may create these approved follow-up issues, update their labels, and update tracker bodies. It may not invent an approval comment or turn unselected alternatives into implementation work.

## Dedicated-agent queue loop

A user can authorize a bounded queue run with a prompt such as:

> Use the mobile-ui-engineer agent to consume eligible issues from the earliest active milestone. Follow the WIP limit, open one issue-closing PR per concern, and stop at every human gate. Do not merge or publish.

Within that session, the agent must:

1. query open issues and select the oldest or explicitly highest-priority issue carrying both `status:ready` and `agent:eligible` in the earliest active milestone;
2. confirm every implementation dependency's linked PR is merged into the default branch and present in the new branch base, every decision dependency has an approved record, and no `human-required` condition applies;
3. claim the issue by replacing `status:ready` with `status:in-progress`, adding `agent:claimed`, and commenting with the intended branch, UTC claim time, six-hour lease expiry, and session task;
4. create a fresh branch from current `main` named `agent/issue-<number>-<slug>`;
5. implement only the issue contract with atomic, trailer-compliant commits;
6. add deterministic showcase states, documentation, exports, and a semver-correct Changeset when required;
7. run the applicable validation and inspect the packed public artifact;
8. open one implementation PR whose body contains `Closes #<number>`;
9. replace `status:in-progress` with `status:in-review` and remove `agent:claimed`;
10. select another independent ready issue only when the WIP policy permits it.

If a session ends, the next dedicated session resumes by querying labels, milestones, open PRs, branches, Actions, and issue timelines. It must never assume local state from an earlier session.

## Interrupted-work recovery

A fresh session must not silently steal `agent:claimed` work.

- Every claim comment records the issue, intended branch, UTC claim time, session task, and a six-hour lease expiry. The owning session may renew the lease with a timestamped heartbeat before expiry when work is still active.
- While the latest lease is unexpired, another session must not mutate, relabel, resume, or replace the claim; it reports the issue as in flight and selects other eligible work.
- After lease expiry, inspect the issue timeline, remote branch, commits, Actions, and PRs. If the recorded branch or an open PR exists, stop and ask whether to resume that exact work; never create a second branch for the issue.
- If the lease expired and no remote branch, PR, commit, workflow, or post-claim timeline activity exists, move the issue to `status:blocked` plus `human-required` and request explicit recovery approval.
- After approval, clear the stale claim and return the issue to `status:ready`, or resume the existing branch when its diff and base are safe.
- If an implementation PR closes without merge, move the issue from `status:in-review` to `status:blocked` plus `human-required`. Reopen the same PR whenever possible.
- A replacement PR requires explicit human approval, must reference the closed PR and same issue, and must leave only one active implementation PR. It does not authorize broader scope.
- After a normal merge closes the issue, verify the merge commit is on the default branch before unblocking dependents.

## Work-in-progress limit

- One issue may be actively implemented at a time per agent session.
- At most two agent-authored implementation PRs may remain open across the repository.
- A second PR is allowed only when it is independent of the first, does not modify the same public contract, and will not create stacked branch ancestry.
- When the cap is reached, the agent stops and reports the PRs awaiting review.
- Decision and documentation work may continue only when it cannot invalidate an open implementation.

This limit allows useful continuity without replacing review with an unbounded PR backlog.

## Stop and escalation conditions

The agent must stop the queue and request human input when:

- an issue lacks a required contract section or has contradictory acceptance criteria;
- a dependency is open, a shared public API is unsettled, or scope must move between releases;
- implementation would require a new dependency, native module, binary rebuild, permission, or compatibility change;
- tests or test infrastructure are needed but not explicitly approved;
- validation fails in a way that requires contract or architecture changes;
- credentials, npm configuration, release merging, publication, or destructive Git history would be involved;
- the active milestone exceeds one coherent capability or its normal two-to-four-component budget.

The agent opens a follow-up issue instead of silently expanding the assigned issue.

## Pull-request contract

Every implementation PR must:

- target the default branch from a fresh issue branch;
- close exactly one atomic issue with `Closes #<number>`;
- state milestone, dependencies, state coverage, accessibility decisions, platform behavior, performance impact, and release-budget effect;
- include a Changeset or an explicit valid reason it is not required;
- report exact validation evidence and checks not run;
- preserve extremely atomic commits with the required Stanley co-author trailer;
- remain unmerged until human review and authorization.

Use normal merge commits. Never squash or rebase-merge away the atomic history. Queue authorization never includes merging. A later, separate user message may authorize the agent to execute a normal merge only when it names the reviewed PR; the agent must recheck its exact head SHA, issue contract, CI, commit trailers, mergeability, and WIP/release state immediately before acting. No standing or inferred merge permission exists.

## Discovery-tracker lifecycle

A `type:discovery` umbrella never enters Changesets or OIDC publication:

1. `status:needs-brief`: discovery outcomes and evidence are incomplete;
2. `status:in-progress`: its discovery issues are being researched and decided;
3. `status:complete`: every child is promoted into an approved numbered tracker/milestone or explicitly deferred with rationale; close the discovery tracker and milestone.

If a discovery fails or lacks required evidence, use `status:blocked` plus `human-required`. Never apply `status:release-ready` or `status:released` to a discovery umbrella.

## Release-tracker lifecycle

A release tracker is not an implementation queue item:

1. `status:needs-brief`: capability, required issues, dependencies, budget, and deferrals are incomplete;
2. `status:in-progress`: a human approved the slice contract and its milestone is the active implementation target;
3. `status:release-ready`: the agent completed the technical audit and posted its version recommendation; add `human-required` to signal the separate merge-authorization gate;
4. `status:released`: OIDC publication succeeded, evidence is recorded, and the tracker plus milestone close;
5. `status:blocked`: publication or a release invariant failed; add `human-required`, keep the tracker/milestone open, and do not advance the queue.

The agent may audit a `type:release` tracker in `status:in-progress` after all required atomic issues merge. It must not process the tracker as an implementation issue or require `agent:eligible`.

## Release-readiness decision

Changesets opens or updates `chore: release packages` after qualifying changes reach `main`; it does not wait for a milestone. That generated PR is expected to remain open while the slice accumulates.

The mobile UI engineer owns the readiness **recommendation** and proposed semantic version. It marks the slice `status:release-ready` only after verifying:

1. every implementation issue is closed by a reviewed normal-merged PR on the default branch, every decision issue has its approved comment and prescribed closure record, and no release blocker remains;
2. the merged work still forms one coherent capability within budget;
3. every public change has the correct Changeset and the generated version is expected;
4. public exports, declarations, packed files, documentation, and deterministic showcase states are complete;
5. repository validation, isolated package verification, Expo compatibility, CI, and release preparation are green at the candidate SHA;
6. deferred work is recorded in later issues rather than hidden in the release.

The agent then comments on the slice tracker with evidence, the proposed version, and residual risks; it applies `status:release-ready` plus `human-required`. Technical readiness deliberately excludes merge authorization. A human retains the sole authority to authorize merging the generated release PR. If a later, separate user message names that reviewed release PR, an agent may execute its normal merge only after rerunning the pre-merge checks. GitHub Actions publishes through OIDC after the merge; the agent never runs `npm publish`.

## Post-publication transition

After the generated release PR merges:

- **Success:** record the actual npm version, provenance link, workflow run, and release commit on the tracker; replace `status:release-ready` with `status:released`; remove `human-required`; close the tracker and milestone; then evaluate the next milestone's dependencies.
- **Failure:** replace `status:release-ready` with `status:blocked`; retain `human-required`; keep the tracker and milestone open; diagnose through a bounded issue/PR without local publication, token fallback, or bypass.

Only verified publication retires a slice. A merged release PR or locally changed version is not sufficient.

## Continuity boundary

The issue queue behaves like a durable developer backlog, but it is not a scheduler. A dedicated Kiro Web session can process multiple eligible issues until it reaches the WIP cap, a stop condition, or the end of the queue. Starting, resuming, or replacing that session remains an explicit user action.

A future self-triggering dispatcher would require a separate reviewed security design covering identity, least-privilege GitHub access, concurrency, failure recovery, cost limits, and an absolute inability to merge or publish. No such dispatcher is authorized by this workflow.

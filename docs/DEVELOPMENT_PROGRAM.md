# Mobile UI app-enablement program

## Outcome

The program delivers a native design system deep enough for Mitumba's buyer and seller applications to build coherent production flows without rebuilding shared presentation and interaction contracts inside the apps.

The program is intentionally larger than one release and intentionally smaller than the applications. It ends at reusable UI responsibilities; navigation, sessions, queries, stores, analytics, permissions, uploads, payments, persistence, and business policy remain consumer-owned.

GitHub issues and milestones are the live execution state. This document defines the durable dependency and completion model; it must not be used to bypass an issue contract.

## Live execution map

- [Program tracker #5](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/5)
- [`0.2.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/1) and [slice tracker #6](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/6)
- [`0.3.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/2) and [slice tracker #7](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/7)
- [`0.4.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/3) and [slice tracker #8](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/8)
- [`0.5.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/4) and [slice tracker #9](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/9)
- [`0.6.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/5) and [slice tracker #10](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/10)
- [`0.7.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/6) and [slice tracker #11](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/11)
- [`0.8.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/7) and [slice tracker #12](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/12)
- [`0.9.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/8) and [slice tracker #13](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/13)
- [`0.10.0` milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/9) and [slice tracker #14](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/14)
- [Extended discovery milestone](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/milestone/10) and [discovery tracker #15](https://github.com/Mitumba-Ltd/mitumba-mobile-ui/issues/15)

Each queue root's canonical issue checklist is its seeded body rows plus authenticated, immutable-receipt-backed `Queue-root checklist entry` comments, hashed independently with the root fingerprint. Design-gated roots append accepted child/deferral entries instead of replacing tracker bodies; any nonempty extension requires a fresh activation bound to the resulting checklist hash before child selection. Program tracker #5's canonical root map is its seeded body checklist plus authenticated, immutable-receipt-backed `Program map entry` comments; decision expansions append one entry per generated root or explicit deferral instead of replacing #5's body.

Every operator invocation starts from tracker #5, verifies its current fingerprint and independently computed program-map hash, reconciles the fixed `refs/heads/agent/recovery-active` mutex and both repository WIP slots, then verifies the single active release-or-discovery root before querying eligible children. Runtime expiry is a durable handoff for `standing-policy` and independently verifiable durable records, not a new authorization gate; a `session-direct-active-kiro-user` instruction instead expires with its positively identified runtime and cannot be reconstructed. The next invocation resumes the next safe phase from GitHub evidence under `docs/ISSUE_WORKFLOW.md`. A recovery-blocked #5 stops normal selection even when root and slot refs otherwise appear valid. An unchanged aborted business subject can proceed only through the sole currently qualified append-only lineage head: its exact human-authority use selects a closed safe option from a non-self-referential basis and the existing eight dispositions, and start atomically creates the same-mutex/start/spend/child-edge transaction. Stale or expired unspent generations are superseded rather than marked spent; completion suppresses the subject, while an abort requires distinct fresh durable evidence with a new stable evidence key. Direct-runtime loss permits only the conservative fixed expiry-indeterminate outcome and abort/mutex release, never success or resend. Each one-shot POST, decision-close PATCH, and normal-merge mutation has one fixed attempt/outcome, successful merges add a fixed result, and every permanent recovery record has a reproducible complete commit envelope. A terminal decision operation derives closed `decision-stop:v1` and explicit `decision-stopped`; only evidence-preserving `abandon-decision` may consume it, while closure validation remains false. Policy-transition enumeration uses absent-mutex `preSelectionPolicyQuiescence`, selected execution uses exact-bound `selectedPolicyTransitionQuiescence`, and successful all-or-nothing cutover yields terminal-only `policy-transition-completed`. Copied documentation never overrides live evidence.

## Program checkpoints

### Native system foundation

Expected through the form-core slice, currently planned as `0.2.0`–`0.5.0`:

- reusable surface, action, progress, loading, motion, and elevation contracts;
- listing presentation and recoverable collection states;
- controlled text, search, chip, and one approved selection input;
- package-level accessibility and low-end Android behavior that later components reuse.

### Buyer-app UI foundation

Expected after buyer search/navigation presentation and cart/order summary, currently planned through `0.7.0`:

- discovery and listing composition;
- loading, empty, error, retry, and offline presentation;
- search/filter/sort result-context presentation;
- controlled cart-item, quantity, and order-summary presentation.

This checkpoint means the buyer app can compose its core UI from package contracts. It does not mean buyer routes, APIs, checkout, or payments belong in this repository.

### Buyer-and-seller app UI foundation

Expected after orders/trust, seller identity/store, and seller authoring presentation, currently planned through `0.10.0`:

- order progress, trust, rating/review, and recovery presentation selected by an approved slice design;
- seller identity and store context selected by an approved slice design;
- controlled listing-authoring sections, media summaries, validation, and draft presentation selected by an approved slice design.

### Extended product UI

Messaging, confirmations and modal patterns, disputes and two-factor-authentication presentation, and VAZI experiences follow the core checkpoints. Each starts with discovery and becomes a numbered release only after its scope forms one coherent capability. After the numbered `0.10.0` dependency is verifiably released, tracker #15 may receive an accepted fingerprint- and checklist-hash-bound activation as the non-publication queue root for its individually approved child decisions; completing it creates or defers later numbered slices but never creates a Changeset or release PR itself. Its bound is the accepted checklist of four named decision contracts and their deferrals—not the two-to-four-component coherence budget applied to each eventual numbered release—and no implementation issue or package change belongs to the discovery milestone.

Version numbers are planning targets. The mobile UI operator derives the actual semantic version from accumulated public changes, independently audits the exact generated release candidate, and normally merges only its non-null tested integration while a strict non-bypassable server exact-base guard and fixed merge-operation records satisfy `docs/ISSUE_WORKFLOW.md`; GitHub Actions OIDC publication is then verified there.

## Seeded release slices

### `0.2.0` — native quality foundations

Decision and foundation work:

1. decide the public naming convention before adding exports alongside `MitumbaText` and `MitumbaButton`;
2. define one reduced-motion policy;
3. define one native elevation policy.

Public components, capped at four:

1. `Surface`;
2. `IconButton`;
3. `Skeleton`;
4. `Progress`.

Dependencies: naming precedes every new public export; elevation precedes `Surface`; reduced motion precedes animated `Skeleton` or `Progress` behavior. Test infrastructure remains excluded unless separately approved.

### `0.3.0` — buyer listing tile

1. `PriceText`;
2. `ConditionBadge`;
3. `ListingCard`;
4. `ListingCardSkeleton`.

Dependencies: `PriceText` and `ConditionBadge` precede `ListingCard`; `Skeleton` and reduced motion precede `ListingCardSkeleton`. The listing contract includes image failure, sold/unavailable, saved, long content, screen-reader actions, and list performance.

### `0.4.0` — shared collection states

1. `EmptyState`;
2. `ErrorState`;
3. `OfflineBanner`.

`ErrorState` may report retry intent; `OfflineBanner` receives connectivity state and never observes the network itself.

### `0.5.0` — form core

1. `TextField`;
2. `SearchField`;
3. `Chip`;
4. decide between `Checkbox`, `Radio`, and `Switch` for the first selection primitive;
5. implement only the approved selection primitive.

The selection decision precedes its implementation issue. `TextField` precedes `SearchField` unless the approved APIs prove composition would be harmful.

### `0.6.0` — buyer search and navigation presentation

Begin with one slice-design issue after the form-core APIs are proven. It selects two to four public responsibilities for search, filter, sort, and result context. The approved decision then creates one issue per component. Queries, analytics, routes, navigation state, and result fetching remain app-owned.

### `0.7.0` — cart and order summary

1. `CartItem`;
2. `QuantityStepper`;
3. `OrderSummaryCard`.

The package reports intent and displays supplied values. It does not mutate a cart, calculate server-authoritative totals, navigate to checkout, or execute payment.

### `0.8.0` — orders and trust

Begin with one slice-design issue that selects no more than four related components for order progress, ratings/reviews, trust evidence, and recovery actions. It must separate buyer intent callbacks from business decisions before creating implementation issues.

### `0.9.0` — seller identity and store

Begin with one slice-design issue that selects the public components for seller identity, supplied trust signals, and store context. The package neither infers trust nor fetches seller information.

### `0.10.0` — seller listing authoring

Begin with one slice-design issue that selects controlled presentation for listing sections, condition, price, media summaries, validation, and draft state. Camera/image picking, permissions, uploads, persistence, and submission remain app-owned.

### Later discovery

Seed one design/discovery issue for each area rather than speculative implementation APIs:

1. messaging;
2. confirmation and modal patterns;
3. disputes and two-factor-authentication presentation;
4. VAZI experiences.

A discovery issue may propose one or more numbered milestones and sets of atomic component issues only after dependencies and each independently coherent two-to-four-component capability are approved. Discovery tracker #15 is not a package release: after all four areas are promoted or explicitly deferred, it receives `status:complete` and closes without Changesets or OIDC publication.

## Dependency spine

```text
public naming ────────────────→ every new public export
native elevation ─────────────→ Surface
reduced motion ───────────────→ Skeleton / Progress ─→ ListingCardSkeleton
Surface + listing semantics ──→ ListingCard
form core ────────────────────→ buyer search slice design
listing + collection + search → buyer discovery composition
quantity + supplied totals ───→ cart/order summary
buyer foundations ────────────→ orders/trust design
seller identity ──────────────→ seller authoring context
core app foundations ─────────→ extended product discovery
```

Dependencies are issue-level facts, not permission to stack branches. A dependent issue becomes `status:ready` only after every implementation blocker is normally merged and reachable from `main` and every decision blocker passes `validateDecisionClosure` through its canonical `decision-closure-result:v1` or the sole exact issue #16 adapter.

## Program expansion rule

For intentionally undefined slices, the design issue must:

1. inspect real buyer/seller flow requirements and approved earlier APIs;
2. propose one coherent outcome with normally two to four public components, or—when the approved discovery contract requires or expressly permits an evidence-backed split—multiple sequential outcomes that each independently satisfy that same coherence and component budget;
3. document non-goals, state and accessibility risks, platform behavior, dependency order, alternatives, and deferrals;
4. gather independent evidence, compare alternatives, and either select the strongest bounded outcome through a truthful autonomous `standing-policy` decision record or stop at a canonical genuine escalation until the exact accepted `durable-independent-human` or current-runtime `session-direct-active-kiro-user` statement binds the complete decision subject and its authority-use ref is atomically consumed with the record attempt; direct-authority success outcome/result pairs and close/finalization pairs are atomic in that receiving runtime, while positive immutable termination later permits only original-use-bound expiry indeterminacy and an active stop, and ordinary comments never supply durable human provenance;
5. bind the selected outcome, exact issue/root/#5 fingerprints, checklist/program-map hashes, dependency order, deferrals, and every planned mutation in one immutable expansion plan before changing GitHub state;
6. execute that plan through the crash-safe, marker-keyed decision-expansion transaction in `docs/ISSUE_WORKFLOW.md`, using the v3 intent's exact base tree/date, predeclared canonical output-key digests, exactly one fixed outcome per terminalized one-shot POST (resource-observed, winner-only pre-send-not-sent, request-indeterminate, or original-use-bound expiry-indeterminate), endpoint-truthful actor/app attribution, canonicalizer/mode-bound receipts only for resource outcomes, and only its closed issue-create, milestone-create, and issue-comment-append operations;
7. create one detailed `status:needs-brief` issue per selected component or foundation concern;
8. append one immutable-receipt-backed `Queue-root checklist entry` for every child or deferral added to an existing root, then obtain a fresh `root-activation:v2` record keyed by the unique active policy SHA and resulting checklist hash before child work resumes;
9. create each separately coherent new milestone first through its plan output, then create its slice tracker in final form bound to that earlier milestone receipt; never use a non-conditional replacement;
10. append one immutable-receipt-backed `Program map entry` to tracker #5 for every resulting queue root or explicit deferral;
11. leave every new issue non-eligible until its individual contract has a fingerprint-bound standing-policy assessment;
12. publish and validate the canonical decision record, expansion or strict no-output effects, closure comment, and fixed issue-close PATCH outcome, then atomically create `decision-closure-result:v1` with exact branch/slot retirement; only that final result passes `validateDecisionClosure` and closes the design issue without an implementation PR.

This lets the issue program grow continuously without pretending that today's guesses are approved future APIs.

## Completion evidence

A checkpoint is reached only when:

- every implementation issue is closed by its own independently reviewed, normal-merged PR after continuous fingerprint and integration checks, while every decision issue passes `validateDecisionClosure` only after its canonical record, immutable expansion or strict no-output effects, closure comment, fixed issue-close PATCH outcome, and atomic final result/ownership retirement; only an escalated decision additionally binds its exact accepted human-authority variant;
- release trackers and milestones contain no hidden or contradictory scope, and each activated root's body-plus-receipt checklist hash still matches its accepted activation;
- all public changes have correct Changesets and deterministic showcase states;
- accessibility, iOS/Android behavior, dynamic type, reduced motion, and low-end Android constraints are represented;
- packed-package verification proves the npm artifact works in an isolated Expo consumer;
- deferred responsibilities remain visible as issues;
- exact-head release audit, outer-operator verification of the canonical review manifest/Git identities/non-null tested integration/current exact-base guard/artifact bytes, byte-complete independent semantic inspection, strict-guarded fixed-operation normal merge, GitHub Actions OIDC publication, and registry/provenance verification remain distinct and durably evidenced.

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

Each queue root's canonical issue checklist is its seeded body rows plus authenticated, immutable-receipt-backed `Queue-root checklist entry` comments, hashed independently with the root fingerprint. Design-gated roots append approved child/deferral entries instead of replacing their tracker bodies; any nonempty extension requires a fresh activation bound to the resulting checklist hash before child selection. Program tracker #5's canonical root map is its seeded body checklist plus authenticated, immutable-receipt-backed `Program map entry` comments; future decision expansions append one entry per generated root or explicit deferral instead of replacing #5's body. A fresh agent session starts from tracker #5, verifies its current issue fingerprint and independently computed program-map hash, and verifies that it has no unresolved program-level recovery quarantine or incomplete recovery action, then verifies the single active release-or-discovery queue root's accepted activation fingerprint and repository WIP slots before querying that root's eligible milestone children. A recovery-blocked #5 is a global queue stop even when the root and slot refs otherwise appear valid; copied status in documentation never overrides live evidence.

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

Version numbers are planning targets. The mobile UI engineer proposes the actual semantic version at release readiness from the accumulated public changes; only a later, separate direct active-user instruction naming the reviewed release PR and exact head SHA may authorize its normal expected-SHA merge, and GitHub Actions owns OIDC publication.

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

Dependencies are issue-level facts, not permission to stack branches. A dependent issue becomes `status:ready` only after its blockers are merged into `main`.

## Program expansion rule

For intentionally undefined slices, the design issue must:

1. inspect real buyer/seller flow requirements and approved earlier APIs;
2. propose one coherent outcome with normally two to four public components, or—when the approved discovery contract requires or expressly permits an evidence-backed split—multiple sequential outcomes that each independently satisfy that same coherence and component budget;
3. document non-goals, state and accessibility risks, platform behavior, dependency order, alternatives, and deferrals;
4. move to `status:needs-decision` and obtain an accepted active-user or currently verified maintainer/admin approval record that names every selected contract and binds it, the active root's current fingerprint/checklist hash, program tracker #5's current fingerprint/map hash, and one immutable expansion plan;
5. execute that plan through the crash-safe, marker-keyed decision-expansion transaction in `docs/ISSUE_WORKFLOW.md`, using predeclared canonical output-key digests and only create-only, append-only, commutative field-preserving, or server-conditionally safe API mutations;
6. create one detailed `status:needs-brief` issue per approved component or foundation concern;
7. append one immutable-receipt-backed `Queue-root checklist entry` comment for every child or deferral added to an existing root, then obtain a fresh activation bound to its resulting checklist hash before child work resumes;
8. create each separately coherent new slice tracker and milestone in its approved final form rather than using a non-conditional replacement;
9. append one immutable-receipt-backed `Program map entry` comment to tracker #5 for every resulting queue root or explicit deferral;
10. leave every new issue non-eligible until its individual contract has an accepted fingerprint-bound approval record;
11. post and verify the prescribed expansion and decision-closure records, then close the design issue without an implementation PR.

This lets the issue program grow continuously without pretending that today's guesses are approved future APIs.

## Completion evidence

A checkpoint is reached only when:

- every implementation issue is closed by its own reviewed, normal-merged PR after continuous fingerprint checks, while every decision issue has a verified decision-closure record linked to its accepted approval;
- release trackers and milestones contain no hidden or contradictory scope, and each activated root's body-plus-receipt checklist hash still matches its accepted activation;
- all public changes have correct Changesets and deterministic showcase states;
- accessibility, iOS/Android behavior, dynamic type, reduced motion, and low-end Android constraints are represented;
- packed-package verification proves the npm artifact works in an isolated Expo consumer;
- deferred responsibilities remain visible as issues;
- the release-readiness recommendation, separate exact-PR/exact-SHA active-user merge authorization, and GitHub Actions OIDC publication record remain distinct.

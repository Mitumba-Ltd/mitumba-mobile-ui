# Native UI development program

## Purpose

`@mitumba/mobile-ui` is Mitumba's native-first React Native and Expo design system. It should match the visual care, API discipline, state coverage, and accessibility quality of `mitumba-ui` without mechanically porting web implementations.

The absence of CSS is not a reduced design target. Native quality comes from platform primitives, touch and gesture behavior, dynamic type, safe-area and keyboard handling, screen-reader semantics, motion preferences, and predictable performance on real iOS and Android devices.

This document is the working sequence for releases after `0.1.0`. It is a planning contract, not permission to publish. Every slice still requires an accepted fingerprint-bound brief approval; merging a reviewed release PR requires a later, separate direct instruction from the active user that names it, and npm publication remains GitHub Actions OIDC-only.

## Architecture contract

The package follows this dependency direction:

```text
@mitumba/tokens
        ↓
foundations → theme → primitives → components → patterns
                                             ↓
                                      consumer apps
```

- **Foundations** translate portable tokens into native measurements, motion, elevation, and accessibility policies.
- **Theme** exposes stable semantic values for native consumers and package internals.
- **Primitives** provide small reusable React Native building blocks with consistent semantics.
- **Components** model one marketplace UI responsibility and expose typed, semantic APIs.
- **Patterns** compose components into documented presentation patterns without owning application flows.
- **Consumer apps** own navigation, routes, sessions, stores, API calls, analytics, permissions, and payment execution.

Public UI remains presentational and callback-driven. Components may report intent such as `onPress`, `onRetry`, `onQuantityChange`, or `onSellerPress`; they must not navigate, fetch data, read application state, or execute business operations themselves.

## Native-first quality contract

Every relevant component brief and review must address:

- a minimum 44 × 44 point interactive target;
- dynamic type, large-font reflow, and critical content that remains understandable without relying on truncation;
- screen-reader name, role, state, value, and action feedback;
- loading, disabled, empty, error, offline, success, and retry behavior where the responsibility requires them;
- reduced-motion behavior and restrained native elevation;
- safe-area, on-screen keyboard, and Android back behavior when the component participates in those interactions;
- visual and interaction behavior on both iOS and Android;
- avoidable renders, list suitability, image cost, and animation cost on low-end Android devices;
- deterministic showcase cases for important variants and states.

Web implementation mechanics are prohibited in package code: MUI, Emotion, `sx`, DOM elements, CSS Grid, media queries, hover or pseudo-selectors, CSS transitions or keyframes, browser font stacks, CSS shadows, anchor routing, and browser event contracts. Reuse semantic intent from `mitumba-ui`, not its rendering implementation.

A new native dependency requires explicit approval before adoption. Its brief must document bundle impact, native-module or binary rebuild requirements, Expo compatibility, maintenance health, and a no-new-dependency alternative.

## Component work packet

Work proceeds in this order for each component or tightly bounded concern:

1. **Brief:** user problem, usage context, non-goals, and layer placement.
2. **State matrix:** content, interaction, asynchronous, failure, accessibility, and platform states that apply.
3. **API proposal:** public types, controlled versus uncontrolled behavior, semantic callbacks, defaults, and escape hatches.
4. **Design proposal:** hierarchy, token use, touch behavior, type scaling, platform differences, and performance risks.
5. **Implementation:** types and JSDoc, component, local exports, root export, documentation, and deterministic showcase cases.
6. **Release note:** a Changeset for any public behavior change, sized according to semantic versioning.
7. **Verification:** inspect the diff and packed public artifact, then run the repository checks.

Do not start a broad catalog while API or state decisions remain unresolved. A brief can revise the planned component name or scope when native interaction research justifies it.

## Issue execution

`docs/DEVELOPMENT_PROGRAM.md` defines app-enablement checkpoints and the dependency spine. `docs/ISSUE_WORKFLOW.md` defines the executable queue, issue states, work-in-progress limit, PR-closing contract, and release-readiness decision.

- Every known component or foundation concern receives one detailed issue and one implementation PR.
- Intentionally undefined slices receive a design issue first; approved design work creates the later atomic implementation issues.
- Only issues carrying both `status:ready` and `agent:eligible` may enter the dedicated-agent queue.
- Each implementation PR contains `Closes #<issue>` and must not absorb follow-up scope.
- GitHub milestones and slice trackers are the live execution state; this roadmap remains the sequencing and quality contract.
- A dedicated Kiro Web session may consume multiple independent eligible issues within the WIP limit, but the custom agent is not a persistent scheduler and cannot wake itself after the session ends.

## Release operating model

- One component or engineering concern per implementation PR.
- One coherent user capability per minor release.
- A minor release normally contains two to four tightly related public components at most.
- A patch release fixes one narrow public defect or documentation error and must not hide unrelated features.
- Foundations may ship before a visible marketplace component when they remove duplication or establish an accessibility contract required by the next slice.
- Public behavior changes require a Changeset; internal documentation-only planning does not.
- Test infrastructure or new tests are added only when the task explicitly approves that work.
- The engineer may prepare implementation PRs and Changesets, but must never merge during queue execution, publish npm, or independently expand release scope. A later separate user message may authorize a normal merge of the specifically named reviewed PR.
- The engineer owns the evidence-based release-readiness recommendation and proposed semantic version; a later direct active-user instruction naming the reviewed release PR owns merge authorization, while GitHub Actions owns OIDC publication.
- Changesets may open a release PR after the first public-change PR in a slice. Keep it unmerged until the milestone tracker is `status:release-ready`.
- Human- or agent-authored commits must be extremely atomic and include:

  ```text
  Co-authored-by: Sir Stanley <sir.stanley@stanl.ink>
  ```

  Bot-generated commits, including Changesets release commits authored by `github-actions[bot]`, are exempt.

- Pull requests use normal merge commits so their atomic history is preserved.

Before proposing publication, verify the accumulated Changesets describe exactly one capability and remain within the release budget. If they do not, defer unrelated work to the next minor.

## Planned release slices

Versions are sequencing targets and may move after an approved brief or an urgent patch. Scope must not silently move between slices.

### `0.2.0` — native quality foundations

Establish the reusable behavior needed by later marketplace components.

- `Surface`
- `IconButton`
- `Skeleton`
- `Progress`
- reduced-motion and native elevation policies
- richer showcase coverage for foundation states
- test substrate only if separately and explicitly approved

### `0.3.0` — buyer listing tile

Deliver a complete, list-safe product discovery unit.

- `PriceText`
- `ConditionBadge`
- `ListingCard`
- `ListingCardSkeleton`

The brief must cover image failure, sold or unavailable state, saved state, long title and price content, accessibility actions, and dense-list performance.

### `0.4.0` — shared collection states

Make data-backed collections understandable and recoverable.

- `EmptyState`
- `ErrorState`
- `OfflineBanner`

### `0.5.0` — form core

Create accessible controlled inputs for search and marketplace forms.

- `TextField`
- `SearchField`
- `Chip`
- one approved selection primitive—`Checkbox`, `Radio`, or `Switch`, not all three by default

### `0.6.0` — buyer search and navigation presentation

Compose search, filter, sort, and result-context presentation without owning navigation or queries. Exact public components are selected by the slice brief after the `0.5.0` input APIs are proven.

### `0.7.0` — cart and order summary

Support a callback-driven purchase summary without executing commerce operations.

- `CartItem`
- `QuantityStepper`
- `OrderSummaryCard`

### `0.8.0` — orders and trust

Present order progress, ratings, reviews, and recovery actions. The brief must cap the slice at four related components and separate buyer actions from application business logic.

### `0.9.0` — seller identity and store

Present seller identity, trust signals, and store context with explicit accessibility semantics. The package must not infer trust or fetch seller data.

### `0.10.0` — seller listing authoring

Provide controlled presentation for listing sections, condition, price, media summaries, validation, and draft state. Permission requests, image picking, uploads, persistence, and submission remain in the app.

### Later slices

Sequence messaging, confirmation and modal patterns, disputes and two-factor-authentication presentation, then VAZI experiences. Each remains subject to the same capability budget; none is permission to ship a large catalog in one release.

## Validation gate

Run the checks supported by the affected scope:

```bash
npm ci
npm run validate
npm run verify:package
```

From `apps/showcase`, also verify Expo dependency compatibility:

```bash
npx expo install --check
```

`verify:package` is mandatory before release preparation because it checks the packed allowlist, rejects credential and environment files, installs the tarball in an isolated Expo consumer, typechecks it, and exports web, iOS, and Android targets.

A successful command is not sufficient by itself. Review the public exports, generated declarations, packed files, showcase state coverage, Changeset scope, and the original brief before declaring the slice complete.

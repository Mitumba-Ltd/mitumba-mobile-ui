# Architecture

## Purpose

`@mitumba/mobile-ui` is Mitumba's native presentation and interaction system. It converts shared brand intent into platform-native React Native components without importing web rendering mechanics.

## Repository boundaries

```text
@mitumba/tokens       Portable brand values
        ↓
@mitumba/mobile-ui    Native presentation and interaction
        ↓
mitumba-mobile        Buyer and seller routes and workflows

@mitumba/sdk          API transport and domain contracts
        ↓
mobile shared layer   Queries, sessions, country, and app orchestration
```

The UI package may depend on portable tokens. It must not depend on buyer/seller routes, stores, API hooks, or private application code.

## Source layers

- `foundations/`: native metrics and policy that are not components.
- `theme/`: safe native adaptation of portable tokens.
- `primitives/`: smallest accessible controls and text/surface elements.
- `components/`: reusable marketplace and trust components.
- `patterns/`: reusable compositions smaller than an app-specific screen.

Dependencies flow downward: patterns may use components and primitives; components may use primitives; primitives may use theme and foundations. Lower layers must never import higher layers.

## Public API

Only named exports from `packages/ui/src/index.ts` are public. Internal paths are free to change. Experimental work stays unexported or uses an explicit experimental entry point.

Components are presentational and callback-driven. They receive data and event handlers from consumers; they do not fetch, navigate, mutate global state, or execute payments.

## Platform contract

- TypeScript/TSX implementation.
- React Native primitives and approved Expo-compatible peers.
- No MUI, DOM elements, CSS, browser hover assumptions, or web layout primitives.
- No custom native code in the initial package.
- Minimum 44-point interactive targets.
- Dynamic type and screen-reader semantics by default.
- Reduced-motion, offline, loading, empty, error, partial, success, and retry behavior considered wherever applicable.
- Performance validated in the Expo showcase with low-end Android as the primary constraint.

## Token adaptation

`@mitumba/tokens` includes both portable values and web-shaped values. Numeric colors, spacing, radii, sizes, and weights may be adapted directly. CSS shadows, CSS transition strings, browser font stacks, relative line-height multipliers, and pixel strings require native conversion or replacement.

The mobile package must preserve semantic meaning rather than mechanically copying web recipes.

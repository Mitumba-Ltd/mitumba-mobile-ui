# `@mitumba/mobile-ui`

Mitumba's native presentation and interaction system for React Native and Expo.

> The package is pre-1.0. Its primary supported consumers are the Mitumba buyer and seller applications.

## Compatibility

| Package                 | Supported baseline   |
| ----------------------- | -------------------- |
| Expo                    | SDK 57               |
| React Native            | 0.86.x               |
| React                   | 19.2.x               |
| Node.js for development | 24.x (24.3 or newer) |

Bare React Native applications are not supported unless a release explicitly says otherwise.

## Installation

After the first public release:

```bash
npm install @mitumba/mobile-ui @mitumba/tokens
```

The host application must provide compatible `react` and `react-native` versions. Future components that require Expo or native peer modules will document those requirements with the release that introduces them.

## Usage

```tsx
import { MitumbaButton, MitumbaText, mobileTheme } from '@mitumba/mobile-ui'

export function Example() {
  return (
    <>
      <MitumbaText variant="heading" weight="bold">
        Discover your next look
      </MitumbaText>
      <MitumbaButton onPress={() => undefined}>Browse listings</MitumbaButton>
    </>
  )
}

console.log(mobileTheme.colors.green)
```

## Initial API

- `mobileTheme` adapts portable `@mitumba/tokens` values for native use.
- `resolveLineHeight` converts type scale multipliers into React Native line heights.
- `MitumbaText` provides semantic typography, tone, and weight.
- `MitumbaButton` provides accessible action variants, loading state, and native touch feedback.
- `useReducedMotion` exposes the effective native reduced-motion policy.
- `ReducedMotionProvider` supplies a deterministic policy to one controlled subtree.

Only exports from the package root are public API. Imports into `src/` or `lib/` are unsupported.

## Reduced motion

`useReducedMotion()` is the single consumption API for package primitives and consumer compositions. It returns `true` when non-essential motion must be reduced. Without a provider, it follows React Native's operating-system accessibility value and updates mounted consumers when that value changes.

```tsx
import { MitumbaText, ReducedMotionProvider, useReducedMotion } from '@mitumba/mobile-ui'

function MotionPolicyStatus() {
  const reduceMotion = useReducedMotion()

  return (
    <MitumbaText>{reduceMotion ? 'Use static feedback' : 'Approved motion may run'}</MitumbaText>
  )
}

export function DeterministicPreview() {
  return (
    <ReducedMotionProvider value>
      <MotionPolicyStatus />
    </ReducedMotionProvider>
  )
}
```

`ReducedMotionProvider` is a scoped deterministic override. The nearest provider wins. `value={true}` is safe when a subtree intentionally enforces less motion. `value={false}` exists so the showcase and controlled validation can render the motion-enabled state; production applications must not use it to bypass a user's system preference. This provider is not an app-owned accessibility setting.

### State contract

| Effective state                                       | `useReducedMotion()` | Subscription behavior                                 |
| ----------------------------------------------------- | -------------------- | ----------------------------------------------------- |
| System preference disabled                            | `false`              | Shared listener remains active                        |
| System preference enabled                             | `true`               | Shared listener remains active                        |
| System preference changes while mounted               | New boolean          | Subscribers update without remounting                 |
| Initial query pending                                 | `true`               | Conservative static fallback until the query resolves |
| Platform query/listener unavailable or throws/rejects | `true`               | Stable conservative fallback                          |
| Nearest provider has `value={true}`                   | `true`               | No platform subscription for that consumer            |
| Nearest provider has `value={false}`                  | `false`              | No platform subscription for that consumer            |

The system path is lazy and shared across the package. The first unoverridden subscriber installs one native listener before querying the current value, preventing a query/listener gap. A runtime event supersedes any older pending query. Additional consumers reuse the same snapshot and listener; the last unsubscribe removes the listener, invalidates pending work, and resets the unobserved snapshot to `true`. Importing the package performs no accessibility query or subscription.

### Motion treatment

Reduced motion changes presentation, never business state or status meaning:

- Stop non-essential repeating motion such as shimmer, decorative loops, and indeterminate movement. Render a stable visual instead.
- Replace non-essential transitional interpolation with the completed visual state rather than hiding, delaying, or skipping the state change.
- Keep progress, loading, success, warning, and error meaning visible through static shape, value, label, and appropriate React Native accessibility state. Animation may supplement meaning when motion is enabled but must never be its only carrier.
- Preserve functional timing, network work, and application state. A visual policy must not shorten a timeout, complete an operation, or alter business behavior.
- Retain motion only when it is essential to understanding direct manipulation or spatial causality and no static equivalent is sufficient. Such motion must be finite, minimal, user-driven where possible, and paired with semantic feedback; it must never become an automatic repeating effect.

Future `Skeleton` and indeterminate `Progress` implementations should therefore stop their loops and remain visibly identifiable when the hook returns `true`. Screen-reader state and static progress/status feedback remain present in both modes.

### Platform assumptions

The compatibility baseline is React Native 0.86.x. Its [`AccessibilityInfo`](https://reactnative.dev/docs/0.86/accessibilityinfo) contract provides `isReduceMotionEnabled()` and the `reduceMotionChanged` event on iOS and Android. On Android, React Native also reports reduced motion when the device's transition animation scale is disabled. The package deliberately consumes that React Native contract rather than browser media queries, CSS, a native module, or global application state.

### API choice

The provider-plus-hook design is the narrowest contract that supports reusable nested primitives and deterministic evidence:

- A hook with an override argument was rejected because every intermediate component would need to accept and forward a showcase concern.
- A public resolver/store was rejected because consumers do not need listener lifecycle or mutable global controls.
- An internal-only policy was rejected because both effective states could not be rendered deterministically through the public package boundary.

The provider owns only a scoped fixed value; the hook remains the one API components consume. Store, context, subscription, query ordering, and race handling stay private implementation details.

## Scope

This package owns native presentation, interaction, accessibility, and visual state. It does not own routes, API requests, server-state hooks, application stores, payment execution, or authentication sessions.

## License

Licensed under the [MIT License](./LICENSE). Copyright © 2026 Mitumba Ltd.

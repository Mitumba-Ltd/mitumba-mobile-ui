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
- `elevation` maps semantic depth levels to native Android and iOS surface styles.
- `Surface` provides a non-interactive container with semantic tone, radius, spacing, and depth.

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

| Effective state                                                 | `useReducedMotion()` | Subscription behavior                                 |
| --------------------------------------------------------------- | -------------------- | ----------------------------------------------------- |
| System preference disabled                                      | `false`              | Shared listener remains active                        |
| System preference enabled                                       | `true`               | Shared listener remains active                        |
| System preference changes while mounted                         | New boolean          | Subscribers update without remounting                 |
| Initial query pending                                           | `true`               | Conservative static fallback until the query resolves |
| Platform value unavailable, non-boolean, throwing, or rejecting | `true`               | Stable conservative fallback                          |
| Nearest provider has `value={true}`                             | `true`               | No platform subscription for that consumer            |
| Nearest provider has `value={false}`                            | `false`              | No platform subscription for that consumer            |

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

## Surface

`Surface` is the non-interactive container the rest of the system builds on. It owns semantic background, corner rounding, inner spacing, an optional hairline border, and a depth level from the elevation policy. It has no press behaviour; an interactive container is a separate control.

```tsx
import { MitumbaText, Surface } from '@mitumba/mobile-ui'

export function ListingCard() {
  return (
    <Surface elevation="raised" radius="large">
      <MitumbaText variant="title" weight="semibold">
        Vintage denim jacket
      </MitumbaText>
    </Surface>
  )
}
```

| Prop        | Values                                       | Default       |
| ----------- | -------------------------------------------- | ------------- |
| `tone`      | `default`, `subtle`, `strong`                | `default`     |
| `elevation` | `flat`, `raised`, `overlay`                  | `flat`        |
| `radius`    | `none`, `small`, `medium`, `large`, `pill`   | `medium`      |
| `padding`   | `none`, `compact`, `comfortable`, `spacious` | `comfortable` |
| `bordered`  | `boolean`                                    | `false`       |
| `clip`      | `boolean`                                    | `false`       |

### Tone and text pairing

`default` uses the surface colour, `subtle` uses the page background for an area recessed **inside** another surface, and `strong` uses the dark brand green. No tone sets a text colour, so pair `strong` with `MitumbaText` tone `inverse`; white on that green is 5.3:1.

### What actually carries the hierarchy

Spacing and typography, not depth and not the border. Measured against the page background, `strong` is 4.9:1, `default` is 1.07:1, and `subtle` is 1.00:1; `bordered` adds roughly 1.4:1 on `default`, 1.1:1 on `subtle`, and nothing at all on `strong`, where the border colour equals the background. So `strong` is the only tone with an edge a low-vision user can find, and `bordered` is decoration.

Group content with padding, gaps, and a heading. Use a surface for grouping and emphasis, never as the only signal that separate things are separate. A flat `subtle` surface placed directly on the page background is invisible by design — nest it inside a `default` surface, which is what "recessed" means here.

### Clipping

`clip` exists because `overflow: 'hidden'` removes the iOS shadow of the view that clips. When `clip` is set, `Surface` renders an inner clipping view and keeps the depth on the outer one, so a rounded image or a coloured bleed can sit flush inside an elevated surface without losing the shadow on either platform. The outer view keeps the tone background because Android composites elevation from the background, so an elevated transparent view would draw nothing.

The inner view grows and shrinks, so a constrained surface such as `style={{ height: 220 }}` still lets a `flex: 1` child fill it and still contains taller content.

### Composition rules

- Consumer `style` is applied last on the outermost view, so the surface's own margin, width, and flex participation behave normally.
- Under `clip`, that outer view is not the children's flex parent. `gap`, `flexDirection`, `alignItems`, `justifyContent`, and `flexWrap` passed through `style` arrange the inner wrapper rather than the children, and a `padding`, `borderWidth`, or `borderRadius` override composes with the inner values instead of replacing them. Wrap the children in your own `View` when you need to arrange them inside a clipped surface.
- Do not nest `raised` inside `raised`. Promote the outer surface to `overlay`, or separate the inner one with `tone="subtle"` and spacing.
- A clipped surface clips its descendants' shadows. Do not place a `raised` or `overlay` surface inside a `clip` surface; give the inner one a tone and a border instead.
- `Surface` is presentational and stateless. Loading, empty, error, and offline presentation belong to the components that compose it.
- Every treatment is a static style object, so repeated use in long lists adds no per-render style resolution; `clip` adds exactly one view. The component is not memoised, so it re-renders with its parent like any other view.

## Elevation

`elevation` is a static record of semantic depth levels resolved for the running platform. It is public because consumers compose their own surfaces, and its output is a plain style object that can be spread into any `View`.

```tsx
import { View } from 'react-native'
import { elevation, mobileTheme } from '@mitumba/mobile-ui'

export function ListingCardSurface({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={[
        {
          backgroundColor: mobileTheme.colors.surface,
          borderRadius: mobileTheme.radius.lg,
          padding: mobileTheme.spacing.lg,
        },
        elevation.raised,
      ]}
    >
      {children}
    </View>
  )
}
```

### Levels

| Level     | Meaning                                             | Android        | iOS                                       |
| --------- | --------------------------------------------------- | -------------- | ----------------------------------------- |
| `flat`    | In-page content with no separation shadow           | `elevation: 0` | zero-opacity shadow                       |
| `raised`  | Card or tile sitting above the page background      | `elevation: 2` | offset `0,1`, radius `3`, opacity `0.10`  |
| `overlay` | Sheet, menu, or dialog temporarily covering content | `elevation: 8` | offset `0,4`, radius `12`, opacity `0.16` |

Three levels are deliberate. Surfaces, cards, and overlays are the only depth distinctions the current roadmap needs, so a longer decorative scale would invite inconsistent usage without a real requirement.

### Rules

- **Depth is never the only signal.** Spacing, grouping, and heading semantics must carry the hierarchy on their own. A hairline `border` on `surface` is roughly 1.4:1 and therefore decoration, not a boundary a low-vision user can rely on; when a surface genuinely needs a visible edge, give it a contrast-bearing colour rather than assuming the shadow or the hairline will read.
- **Android needs an opaque background to draw any shadow.** Android composites elevation from the view's background, so `elevation` on a transparent view renders nothing. Background is a rendering precondition there, not only hierarchy insurance.
- **Android elevation also reorders overlapping siblings.** React Native's `elevation` affects z-order as well as shadow, so a `raised` view can draw above a later sibling on Android while the same style reorders nothing on iOS. Use explicit `zIndex` when stacking order matters.
- **Clipping surfaces need two views.** `overflow: 'hidden'` removes the iOS shadow of the clipping view, so apply the level to an outer view and clip inside it. Android `elevation` is unaffected, so a single-view surface would silently diverge between platforms. A clipping _ancestor_ also cuts a descendant's shadow on both platforms, so an elevated surface must not sit inside a rounded clipping container.
- **Radius belongs to the surface, not the level.** Levels set no `borderRadius`; iOS derives the shadow shape from the view, so set radius and background on the same view that carries the level.
- **Nesting stays restrained.** Do not stack `raised` inside `raised`; promote the outer surface or separate the inner one with background and border instead.
- **Dark surfaces need contrast, not more shadow.** Increase surface contrast rather than opacity, because a near-black shadow is invisible on a dark background.
- **Platform parity is semantic, not pixel-perfect.** Android composites a real elevation shadow while iOS draws an offset blur; the levels are documented separately instead of forcing identical output.

### Tokens and performance

`@mitumba/tokens` exposes `shadows` as CSS `box-shadow` strings. Those are web-only values and are never copied or parsed into native code; the levels above are native replacements that preserve the same restrained intent. The only token reuse is the near-black text colour, applied as the iOS `shadowColor`; Android leaves the shadow tint to the platform, so that reuse is iOS-only. Each level is a single static object created once at module load, so list-heavy screens reuse the same style reference and add no per-render work. Prefer a static level over animating shadow properties on low-end Android, where elevation changes force expensive re-compositing.

## Scope

This package owns native presentation, interaction, accessibility, and visual state. It does not own routes, API requests, server-state hooks, application stores, payment execution, or authentication sessions.

## License

Licensed under the [MIT License](./LICENSE). Copyright © 2026 Mitumba Ltd.

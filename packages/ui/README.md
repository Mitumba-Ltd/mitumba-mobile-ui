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

Only exports from the package root are public API. Imports into `src/` or `lib/` are unsupported.

## Scope

This package owns native presentation, interaction, accessibility, and visual state. It does not own routes, API requests, server-state hooks, application stores, payment execution, or authentication sessions.

## License

Licensed under the [MIT License](./LICENSE). Copyright © 2026 Mitumba Ltd.

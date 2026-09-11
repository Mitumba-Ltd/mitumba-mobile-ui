# Compatibility policy

## Current baseline

| Layer        | Version       |
| ------------ | ------------- |
| Expo SDK     | 57.x          |
| React Native | 0.86.x        |
| React        | 19.2.x        |
| Node.js      | 24.x (>=24.3) |
| npm          | 12.x          |

The Expo showcase is the executable source of truth for this matrix. Versions must be upgraded together according to Expo's compatibility table.

## Package peers

`react` and `react-native` are host-owned peer dependencies. The library must not bundle duplicate copies. Native Expo modules, Reanimated, Gesture Handler, and similar packages become peers when exported components require them.

## Changes

A compatibility expansion or reduction must:

1. Update package peer ranges.
2. Update the showcase host.
3. Pass packed-artifact verification.
4. Update this matrix and package README.
5. Include a Changeset describing consumer impact.

## Bare React Native

The package is first-party-first and Expo-supported. Bare React Native support is not implied by public npm availability. It may be documented only after a representative bare application passes the same artifact and native dependency checks.

## Native dependency changes

Adding or changing a native module can require a new application binary even when the package's JavaScript is OTA-compatible. Release notes must distinguish JavaScript-only updates from updates that require new buyer and seller EAS builds.

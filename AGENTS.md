# Agent guide

This repository publishes `@mitumba/mobile-ui`, Mitumba's native design and interaction system for React Native and Expo.

## Required reading

1. `CONTRIBUTING.md`
2. `docs/ARCHITECTURE.md`
3. `docs/COMPATIBILITY.md`
4. `docs/RELEASING.md`
5. The assigned issue or task

## Non-negotiable rules

- Work from a scoped branch; never commit directly to `main`.
- One concern per branch and highly atomic commits.
- TypeScript/TSX only for package implementation.
- No MUI, DOM elements, CSS, direct API calls, routes, app stores, secrets, or payment logic.
- Do not add dependencies without explaining why a primitive cannot solve the requirement.
- Keep exported APIs narrow and documented.
- Add a Changeset for every consumer-visible package change.
- Run `npm run validate` and `npm run verify:package` before requesting review.
- Never run `npm publish` except for the one-time organization-owner bootstrap in `docs/RELEASING.md`; never add an npm token or edit generated release versions manually.
- Do not weaken checks to make a change pass.

## Definition of done

A component is not complete when its ideal screenshot looks correct. It is complete when its content hierarchy, interaction semantics, accessibility, adaptive layout, and relevant loading/error/empty/offline/success/retry states are represented and verified.

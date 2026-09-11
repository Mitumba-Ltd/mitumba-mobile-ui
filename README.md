# Mitumba Mobile UI

Mitumba's public native design and interaction system for React Native and Expo.

The repository publishes [`@mitumba/mobile-ui`](./packages/ui) and contains a private Expo showcase that validates the package in a real host application.

## Status

The deprecated `0.0.0` bootstrap reservation is live on npm, and the GitHub Actions OIDC trusted publisher has been configured. The package is preparing its first supported public `0.1.0` release. It is first-party-first: Mitumba's buyer and seller applications are the primary supported consumers.

## Structure

```text
apps/showcase/     Private Expo 57 integration host
packages/ui/       Public @mitumba/mobile-ui package
docs/              Architecture, compatibility, and release policy
.changeset/        Version and changelog intent
.github/workflows  CI and OIDC publication
```

## Toolchain

- Node.js 24.x (24.3 or newer)
- npm 12
- TypeScript 6
- React 19.2
- React Native 0.86
- Expo SDK 57
- React Native Builder Bob
- npm workspaces and Turborepo

## Development

```bash
nvm use
npm install --global npm@12.0.2
npm --version # must print 12.0.2
npm ci
npm run validate
npm run showcase
```

`npm run showcase` starts a long-running Expo process and is intended for local development. CI uses a non-interactive Expo export instead.

## Package verification

```bash
npm run verify:package
```

This command builds and packs `@mitumba/mobile-ui`, enforces the package file allowlist, installs the tarball in an isolated copy of the Expo showcase, typechecks that consumer, and bundles it for web, iOS, and Android. It verifies what npm users receive rather than only the workspace symlink.

## Release model

Changesets creates release pull requests. npm publication uses GitHub Actions OIDC trusted publishing with provenance and no long-lived npm token. Read [`docs/RELEASING.md`](./docs/RELEASING.md) before any package setup or release action.

## Documentation

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/COMPATIBILITY.md`](./docs/COMPATIBILITY.md)
- [`docs/RELEASING.md`](./docs/RELEASING.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## License

Licensed under the [MIT License](./LICENSE). Copyright © 2026 Mitumba Ltd.

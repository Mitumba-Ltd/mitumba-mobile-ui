# Releasing `@mitumba/mobile-ui`

Releases use Changesets and npm trusted publishing through GitHub Actions OIDC. No long-lived npm publication token belongs in GitHub secrets.

## Normal release flow

1. Add a Changeset to every pull request that changes public behavior or API.
2. Merge the pull request to `main` after CI passes.
3. The `Publish` workflow opens or updates `chore: release packages`.
4. Review and merge that generated release pull request.
5. The next `Publish` run builds, verifies, and publishes the new version with npm provenance.

Do not edit package versions or changelogs manually. Do not run `npm publish` locally after trusted publishing is established.

## One-time package bootstrap

The one-time bootstrap was completed on September 11, 2026. `@mitumba/mobile-ui@0.0.0` now exists publicly under the `bootstrap` tag and is deprecated as a reservation artifact. **Do not run another bootstrap publication.**

npm requires a package to exist before a trusted publisher can be attached. The package remains initialized at `0.0.0`, while `.changeset/initial-mobile-ui.md` queues the first supported `0.1.0` release.

The repository and package use the MIT License. The release gate confirms that `release-license.json` contains `MIT`, both `LICENSE` files are identical and non-empty, `packages/ui/package.json` declares `"license": "MIT"`, and the packed artifact includes the package license.

For audit history, the bootstrap operator used npm 12, ran every validation gate, authenticated with an ephemeral npm credential, and published only the verified tarball with public access under the `bootstrap` tag.

The account used for package administration must have 2FA enabled and permission in the `@mitumba` organization. npm assigned both `bootstrap` and `latest` to its first-ever version despite the explicit bootstrap tag, then rejected deleting that sole `latest` tag. `0.0.0` is therefore deprecated with a bootstrap-only warning; the supported `0.1.0` release will replace `latest`.

## Trusted publisher status

An npm organization administrator confirmed on September 11, 2026 that the GitHub Actions OIDC connection is configured for this package. The npm trust-list endpoint requires an authenticated account session, so the definitive end-to-end check remains the first `0.1.0` workflow publication; do not add a token fallback if that check fails.

The configured identity is:

```text
Organization or user: Mitumba-Ltd
Repository:           mitumba-mobile-ui
Workflow filename:    publish.yml
Environment:          leave blank
Allowed action:       npm publish
```

The workflow filename is only `publish.yml`, not `.github/workflows/publish.yml`. Values are case-sensitive.

After saving the trusted publisher, open **Publishing access**, choose **Require two-factor authentication and disallow tokens**, and remove any obsolete automation token. OIDC publication continues to work because it uses short-lived workflow identity rather than an npm token.

The equivalent authenticated CLI command is available in npm 11.15 or newer after the package exists:

```bash
npm trust github @mitumba/mobile-ui \
  --repo Mitumba-Ltd/mitumba-mobile-ui \
  --file publish.yml \
  --allow-publish
```

The website flow is preferred for the first setup because it makes the final access policy easy to review.

## Publish `0.1.0`

Once the trusted publisher is configured:

1. Review the generated `chore: release packages` pull request.
2. Confirm it changes `@mitumba/mobile-ui` from `0.0.0` to `0.1.0` and consumes the initial Changeset.
3. Merge it normally.
4. Watch the `Publish` workflow complete.
5. Confirm npm displays provenance and the `latest` tag points to `0.1.0`.

## Failure safety

- Never add `NPM_TOKEN` as a convenience fallback.
- Do not merge a release pull request before the trusted publisher exists.
- Do not publish from a fork; npm validates the repository identity.
- If authentication fails, check the exact repository and workflow filename, `id-token: write`, GitHub-hosted runner, and package `repository.url`.
- If package verification fails, fix the package or showcase and create a new reviewed commit; do not bypass the gate.

## Official references

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [npm organization-scoped public packages](https://docs.npmjs.com/creating-and-publishing-an-organization-scoped-package)
- [npm trust CLI](https://docs.npmjs.com/cli/v12/commands/npm-trust)

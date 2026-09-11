# Security policy

## Reporting

Do not open a public issue for a suspected vulnerability or compromised publication. Report it privately to the Mitumba maintainers through GitHub's private vulnerability reporting for this repository.

## Package publication

- npm releases use GitHub Actions OIDC trusted publishing.
- Long-lived npm publication tokens are prohibited.
- Published files are restricted by the package manifest and verified before release.
- Secrets, service credentials, private keys, and app environment files must never enter source or package artifacts.

## Supported versions

Before `1.0.0`, only the latest published `0.x` release receives security fixes unless Mitumba announces otherwise.

import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import validatePackageLicense from 'validate-npm-package-license'

const repositoryRoot = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const packageRoot = join(repositoryRoot, 'packages', 'ui')

const [approval, packageManifest] = await Promise.all([
  readFile(join(repositoryRoot, 'release-license.json'), { encoding: 'utf8' }).then(JSON.parse),
  readFile(join(packageRoot, 'package.json'), { encoding: 'utf8' }).then(JSON.parse),
])

const approvedLicense = approval.approvedSpdxExpression

if (typeof approvedLicense !== 'string' || approvedLicense.length === 0) {
  throw new Error(
    'Publication is blocked: release-license.json must record Mitumba’s approved SPDX expression.',
  )
}

const validation = validatePackageLicense(approvedLicense)

if (!validation.validForNewPackages || !validation.spdx) {
  const details = [...(validation.warnings ?? []), ...(validation.errors ?? [])].join(' ')
  throw new Error(
    `Publication is blocked: ${approvedLicense} is not a valid SPDX expression for a new npm package.${details ? ` ${details}` : ''}`,
  )
}

if (packageManifest.license !== approvedLicense) {
  throw new Error(
    'Publication is blocked: packages/ui/package.json license must exactly match release-license.json.',
  )
}

const [repositoryLicense, packageLicense] = await Promise.all([
  readFile(join(repositoryRoot, 'LICENSE')).catch(() => null),
  readFile(join(packageRoot, 'LICENSE')).catch(() => null),
])

if (!repositoryLicense || !packageLicense) {
  throw new Error(
    'Publication is blocked: matching LICENSE files must exist at the repository root and packages/ui/.',
  )
}

if (repositoryLicense.length === 0 || !repositoryLicense.equals(packageLicense)) {
  throw new Error(
    'Publication is blocked: the repository and package LICENSE files must be non-empty and identical.',
  )
}

if (!packageManifest.files?.includes('LICENSE')) {
  throw new Error('Publication is blocked: packages/ui/package.json must include LICENSE in files.')
}

process.stdout.write(`Release license gate passed (${approvedLicense}).\n`)

import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const repositoryRoot = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const packageRoot = join(repositoryRoot, 'packages', 'ui')
const showcaseRoot = join(repositoryRoot, 'apps', 'showcase')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const run = (command, args, cwd, extraEnvironment = {}) => {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      ...extraEnvironment,
    },
  })

  if (result.status !== 0) {
    if (result.stdout) process.stdout.write(result.stdout)
    if (result.stderr) process.stderr.write(result.stderr)
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)
  }

  return result.stdout.trim()
}

const packageManifest = JSON.parse(
  await readFile(join(packageRoot, 'package.json'), { encoding: 'utf8' }),
)
const temporaryRoot = await mkdtemp(join(tmpdir(), 'mitumba-mobile-ui-'))

try {
  run(npmCommand, ['run', 'build', '--workspace', '@mitumba/mobile-ui'], repositoryRoot)

  const packOutput = run(
    npmCommand,
    [
      'pack',
      '--ignore-scripts',
      '--json',
      '--workspace',
      '@mitumba/mobile-ui',
      '--pack-destination',
      temporaryRoot,
    ],
    repositoryRoot,
  )
  const parsedPackOutput = JSON.parse(packOutput)
  const artifact = Array.isArray(parsedPackOutput)
    ? parsedPackOutput[0]
    : parsedPackOutput['@mitumba/mobile-ui']

  if (!artifact || artifact.name !== '@mitumba/mobile-ui') {
    throw new Error('npm pack did not produce the expected @mitumba/mobile-ui artifact')
  }

  const publishedFiles = new Set(artifact.files.map(({ path }) => path))
  const requiredFiles = [
    'package.json',
    'README.md',
    'CHANGELOG.md',
    'src/index.ts',
    'lib/module/index.js',
    'lib/typescript/index.d.ts',
  ]

  if (packageManifest.license) requiredFiles.push('LICENSE')

  for (const requiredFile of requiredFiles) {
    if (!publishedFiles.has(requiredFile)) {
      throw new Error(`Packed artifact is missing ${requiredFile}`)
    }
  }

  const forbiddenPath =
    /(^|\/)(?:\.env(?:\.[^/]*)?|__tests__|__fixtures__|coverage|node_modules)(?:\/|$)/
  const credentialPath =
    /(^|\/)(?:GoogleService-Info\.plist|google-services\.json|[^/]+\.(?:jks|keystore|p8|p12|mobileprovision))(?:\/|$)/
  const forbiddenFile = artifact.files.find(
    ({ path }) => forbiddenPath.test(path) || credentialPath.test(path),
  )

  if (forbiddenFile) {
    throw new Error(`Packed artifact contains forbidden path ${forbiddenFile.path}`)
  }

  const allowedRootFiles = new Set(['package.json', 'README.md', 'CHANGELOG.md', 'LICENSE'])
  const isAllowedFile = (path) =>
    allowedRootFiles.has(path) ||
    /^src\/(?:[^/]+\/)*[^/]+\.tsx?$/.test(path) ||
    /^lib\/module\/(?:package\.json|(?:[^/]+\/)*[^/]+\.js(?:\.map)?)$/.test(path) ||
    /^lib\/typescript\/(?:package\.json|(?:[^/]+\/)*[^/]+\.d\.ts(?:\.map)?)$/.test(path)
  const unexpectedFile = artifact.files.find(({ path }) => !isAllowedFile(path))

  if (unexpectedFile) {
    throw new Error(`Packed artifact contains unexpected path ${unexpectedFile.path}`)
  }

  const consumerRoot = join(temporaryRoot, 'showcase-consumer')
  await mkdir(consumerRoot)

  for (const relativePath of ['app.json', 'expo-env.d.ts', 'index.ts', 'tsconfig.json', 'src']) {
    await cp(join(showcaseRoot, relativePath), join(consumerRoot, relativePath), {
      recursive: true,
    })
  }

  const showcasePackage = JSON.parse(
    await readFile(join(showcaseRoot, 'package.json'), { encoding: 'utf8' }),
  )
  showcasePackage.name = '@mitumba/mobile-ui-packed-showcase'
  showcasePackage.dependencies['@mitumba/mobile-ui'] = `file:${join(
    temporaryRoot,
    artifact.filename,
  )}`

  await writeFile(
    join(consumerRoot, 'package.json'),
    `${JSON.stringify(showcasePackage, null, 2)}\n`,
    { encoding: 'utf8' },
  )

  run(
    npmCommand,
    ['install', '--ignore-scripts', '--package-lock=false', '--no-audit', '--no-fund'],
    consumerRoot,
  )
  run(npmCommand, ['run', 'typecheck'], consumerRoot)
  run(npmCommand, ['run', 'build'], consumerRoot, {
    CI: 'true',
    EXPO_NO_TELEMETRY: '1',
  })

  process.stdout.write(
    `Verified ${artifact.filename} (${artifact.size} bytes, ${artifact.files.length} files) in an isolated Expo showcase.\n`,
  )
} finally {
  await rm(temporaryRoot, { force: true, recursive: true })
}

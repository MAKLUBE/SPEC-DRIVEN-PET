import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const candidates = [
  join(process.cwd(), 'node_modules', 'nuxt', 'node_modules', '@nuxt', 'kit', 'dist', 'index.mjs'),
  join(process.cwd(), 'node_modules', '@nuxt', 'kit', 'dist', 'index.mjs')
]

for (const file of candidates) {
  if (!existsSync(file)) continue

  let source = readFileSync(file, 'utf8')
  const originalConst = 'const nearestNuxtPkg = await Promise.all(["nuxt-nightly", "nuxt3", "nuxt", "nuxt-edge"].map((pkg2) => resolvePackageJSON(pkg2, { url: opts.cwd }).catch(() => null))).then((r) => r.filter(Boolean).sort((a, b) => b.length - a.length)[0]);'
  const patchedConst = 'let nearestNuxtPkg = await Promise.all(["nuxt-nightly", "nuxt3", "nuxt", "nuxt-edge"].map((pkg2) => resolvePackageJSON(pkg2, { url: opts.cwd }).catch(() => null))).then((r) => r.filter(Boolean).sort((a, b) => b.length - a.length)[0]);'
  const originalBlock = 'if (!nearestNuxtPkg) {\n    throw new Error(`Cannot find any nuxt version from ${opts.cwd}`);\n  }'
  const patchedBlock = 'if (!nearestNuxtPkg) {\n    const fallbackNuxtPkg = resolve(opts.cwd, "node_modules", "nuxt", "package.json");\n    if (existsSync(fallbackNuxtPkg)) {\n      nearestNuxtPkg = fallbackNuxtPkg;\n    } else {\n      throw new Error(`Cannot find any nuxt version from ${opts.cwd}`);\n    }\n  }'

  if (source.includes(patchedBlock)) {
    console.log(`Nuxt kit patch already applied: ${file}`)
    continue
  }

  if (!source.includes(originalConst) || !source.includes(originalBlock)) {
    console.warn(`Nuxt kit patch skipped; target pattern not found: ${file}`)
    continue
  }

  source = source.replace(originalConst, patchedConst).replace(originalBlock, patchedBlock)
  writeFileSync(file, source)
  console.log(`Nuxt kit patch applied: ${file}`)
}

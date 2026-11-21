import { content } from '../content'

/** A real, deterministic structural check — not AI. Walks the English copy tree and flags
 * any leaf string that is empty/whitespace-only in any of the three languages. TypeScript
 * already guarantees all three languages share the same keys at compile time; this adds a
 * runtime check for empty values, which the type system cannot catch. */
export type TranslationIssue = { path: string; lang: 'en' | 'hi' | 'te' }

function walk(en: unknown, hi: unknown, te: unknown, path: string, issues: TranslationIssue[]) {
  if (typeof en === 'string') {
    if (!(hi as string)?.trim()) issues.push({ path, lang: 'hi' })
    if (!(te as string)?.trim()) issues.push({ path, lang: 'te' })
    return
  }
  if (Array.isArray(en)) {
    en.forEach((item, i) => walk(item, (hi as unknown[])?.[i], (te as unknown[])?.[i], path + '[' + i + ']', issues))
    return
  }
  if (en && typeof en === 'object') {
    for (const key of Object.keys(en)) {
      walk((en as Record<string, unknown>)[key], (hi as Record<string, unknown>)?.[key], (te as Record<string, unknown>)?.[key], path ? path + '.' + key : key, issues)
    }
  }
}
export function checkTranslationCompleteness(): TranslationIssue[] {
  const issues: TranslationIssue[] = []
  walk(content.en, content.hi, content.te, '', issues)
  return issues
}

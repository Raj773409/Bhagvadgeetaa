import type { ScriptureLanguage } from './types'

/**
 * Languages the Gita verse (2.47) is actually published in on this site today — the only
 * ones we can honestly call "verified". The full list of 18 Mahotsav recitation languages
 * has not been publicly announced, so it is NOT fabricated here; see LanguagesPage's pending note.
 */
export const scriptureLanguages: ScriptureLanguage[] = [
  { id: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', verified: true },
  { id: 'en', name: 'English', nativeName: 'English', script: 'Latin', verified: true },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', verified: true },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', verified: true },
]

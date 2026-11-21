import type { VerseRecord } from './types'

/**
 * Only one verse has been through editorial review and is approved for publication.
 * Sanskrit is stored here once, separately from its per-UI-language translation copy
 * (which lives in content.ts, since translations are presentational and language-scoped),
 * matching the "store Sanskrit, chapter, verse, translation and attribution separately"
 * requirement. Do not add entries here without a real, attributed, rights-cleared source.
 */
export const verses: VerseRecord[] = [
  {
    chapter: 2, verseNumber: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    source: 'https://heritage.iitk.ac.in/SBG/2.47',
    attribution: 'Swami Sivananda · Translation excerpt',
    approvedBy: 'scripture_reviewer',
  },
]
export function getVerse(chapter: number, verseNumber: number) {
  return verses.find(v => v.chapter === chapter && v.verseNumber === verseNumber)
}

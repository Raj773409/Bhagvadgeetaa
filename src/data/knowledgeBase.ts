import { content, type Language } from '../content'
import { chapters } from './chapters'
import { verses } from './verses'

/**
 * A deterministic, keyword-matched lookup over content this site has already verified —
 * NOT a generative AI model. The Wisdom Companion uses this when no AI backend is connected
 * (see src/config.ts). Every answer traces to a real chapter, verse or teaching record, so
 * nothing here can fabricate a citation; it can only fail to find one.
 *
 * Matching is exact-token only (after stripping diacritics and stopwords) — never a
 * substring match in either direction — so an unrelated or adversarial query cannot
 * accidentally "hit" a keyword fragment and produce a false citation.
 */
const STOPWORDS = new Set(['the', 'and', 'for', 'are', 'was', 'its', 'this', 'that', 'with', 'from', 'what', 'does', 'say', 'about', 'who', 'how', 'can', 'you', 'tell', 'me'])

function tokenize(text: string): string[] {
  const normalized = text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  return normalized.split(/[^a-z0-9]+/).filter(word => word.length > 2 && !STOPWORDS.has(word))
}

export type KnowledgeEntry = {
  id: string
  keywords: Set<string>
  body: (lang: Language) => string
  citation: { label: string; href: string }
}

function buildEntries(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = []
  for (const chapter of chapters) {
    entries.push({
      id: 'chapter-' + chapter.id,
      keywords: new Set([
        ...tokenize(chapter.transliteration), ...tokenize(chapter.titleEn), ...tokenize(chapter.theme.en),
        'chapter', String(chapter.id),
      ]),
      body: lang => chapter.theme[lang],
      citation: { label: 'Chapter ' + chapter.id + ' · ' + chapter.titleEn, href: '/gita/chapters/' + chapter.id },
    })
  }
  const en = content.en.pages.gita
  en.teachings.forEach((teaching, i) => {
    entries.push({
      id: 'teaching-' + i,
      keywords: new Set([...tokenize(teaching.title), ...tokenize(teaching.body)]),
      body: lang => content[lang].pages.gita.teachings[i].body,
      citation: { label: 'The Bhagavad Gita · Core Teachings', href: '/gita' },
    })
  })
  for (const verse of verses) {
    entries.push({
      id: 'verse-' + verse.chapter + '-' + verse.verseNumber,
      keywords: new Set(['verse', 'shloka', 'duty', 'action', 'karma', 'fruits', 'results', verse.chapter + '.' + verse.verseNumber]),
      body: lang => content[lang].translation,
      citation: { label: 'Chapter ' + verse.chapter + ' · Verse ' + verse.verseNumber, href: '/gita/chapters/' + verse.chapter },
    })
  }
  return entries
}
export const knowledgeBase = buildEntries()

export type SearchResult = { entry: KnowledgeEntry; score: number }
export function searchKnowledgeBase(query: string, limit = 3): SearchResult[] {
  const terms = tokenize(query)
  if (terms.length === 0) return []
  const scored = knowledgeBase
    .map(entry => ({ entry, score: terms.reduce((sum, term) => sum + (entry.keywords.has(term) ? 1 : 0), 0) }))
    .filter(r => r.score > 0)
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit)
}
export const suggestedQuestions = ['What is Karma Yoga?', 'What is Jnana Yoga?', 'What is Bhakti Yoga?', 'What does Chapter 2 teach?', 'What does the Gita say about the fruits of action?']

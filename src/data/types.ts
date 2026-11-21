export type ChapterTheme = { en: string; hi: string; te: string }
export type Chapter = {
  id: number
  sanskrit: string
  transliteration: string
  titleEn: string
  titleTe: string
  verses: number
  theme: ChapterTheme
}
export type EventStatus = 'upcoming' | 'completed' | 'cancelled'
export type MahotsavEvent = {
  slug: string
  dateISO: string
  titleKey: 'curtainRaiser' | 'vishwaMahotsav'
  cancelled?: boolean
}
export type Leader = {
  id: string
  name: string
  role: string
  country: string
  bio: string
  portrait?: string
}
export type LocalizedText = { en: string; hi: string; te: string }
export type VerseRecord = {
  chapter: number
  verseNumber: number
  sanskrit: string
  source: string
  attribution: string
  approvedBy: 'scripture_reviewer'
}
export type Country = {
  id: string
  slug: string
  isoCode: string
  flag: string
  name: LocalizedText
  /** [latitude, longitude] of the capital or principal city — real published coordinates, not estimated. */
  coordinates: [number, number]
  /** General, widely-published cultural context — not a Mahotsav-specific claim or achievement. */
  intro: LocalizedText
  /** The country's national/official language(s) — general reference, independent of Mahotsav programme languages. */
  nationalLanguages: string
  isOrigin?: boolean
}
export type ScriptureLanguage = {
  id: string
  name: string
  nativeName: string
  script: string
  verified: boolean
}
export type MediaItem = {
  id: string
  title: string
  countryId?: string
  eventId?: string
  type: 'image' | 'video'
  imageUrl: string
  thumbnailUrl: string
  videoUrl?: string
  caption: string
  altText: string
  credit: string
  rightsStatus: 'cleared' | 'pending'
  approvalStatus: 'approved' | 'pending'
  publishedAt?: string
}

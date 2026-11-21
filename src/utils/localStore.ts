import { useEffect, useState } from 'react'

/** Generic browser-only persistence for personal data (bookmarks, journal, reading settings).
 * Nothing here is synced anywhere — it lives only in this browser, which is also what keeps
 * it genuinely private from any admin view, since there is no account system to attach it to. */
export function useLocalCollection<T>(key: string) {
  const [items, setItems] = useState<T[]>(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T[] : [] }
    catch { return [] }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(items)) } catch { /* personal data storage is optional */ }
  }, [key, items])
  return [items, setItems] as const
}
export function exportLocalData(keys: string[], filename: string) {
  const data: Record<string, unknown> = {}
  for (const key of keys) { try { const raw = localStorage.getItem(key); if (raw) data[key] = JSON.parse(raw) } catch { /* skip unreadable key */ } }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
export function clearLocalData(keys: string[]) {
  for (const key of keys) { try { localStorage.removeItem(key) } catch { /* nothing to clear */ } }
}

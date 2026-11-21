import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { languages, type Language } from '../content'

function initialLanguage(): Language {
  try { return languages.find(code => code === localStorage.getItem('mahotsav-language')) ?? 'en' }
  catch { return 'en' }
}
const LanguageContext = createContext<{ lang: Language; setLang: (lang: Language) => void } | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(initialLanguage)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('mahotsav-language', lang) } catch { /* Language selection also works without storage. */ }
  }, [lang])
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

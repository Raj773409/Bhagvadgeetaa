import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { Icon } from '../components/ui'
import { searchKnowledgeBase, suggestedQuestions } from '../data/knowledgeBase'
import { useDocumentMeta } from '../utils/seo'

type Message = { question: string; results: ReturnType<typeof searchKnowledgeBase> }

export default function CompanionPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const c = t.pages.companion
  useDocumentMeta(c.heading + ' · ' + t.title.join(' '), c.intro)
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  function ask(question: string) {
    const trimmed = question.trim()
    if (!trimmed) return
    setMessages(m => [...m, { question: trimmed, results: searchKnowledgeBase(trimmed) }])
    setQuery('')
  }

  return <>
    <InnerPageHero lang={lang} eyebrow={c.eyebrow} heading={c.heading} image="scripture" breadcrumb={[{ label: t.nav.gita, href: '/gita' }, { label: t.nav.companion }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={c.eyebrow} heading={c.heading} lede={c.intro} align="center"/>
      <div className="companion-disclosure"><Icon name="book" size={18}/><div><strong>{c.disclosureTitle}</strong><p>{c.disclosureBody}</p></div></div>

      <div className="companion-chat" role="log" aria-live="polite">
        {messages.map((message, i) => <div className="companion-exchange" key={i}>
          <p className="companion-question">{message.question}</p>
          {message.results.length === 0
            ? <div className="companion-answer companion-answer-empty">
                <strong>{c.noResultsTitle}</strong><p>{c.noResultsBody}</p>
              </div>
            : message.results.map(result => <div className="companion-answer" key={result.entry.id}>
                <p>{result.entry.body(lang)}</p>
                <Link className="companion-citation" to={result.entry.citation.href}><Icon name="external" size={13}/>{c.sourceLabel}: {result.entry.citation.label}</Link>
              </div>)}
        </div>)}
      </div>

      <form className="companion-form" onSubmit={(event: FormEvent) => { event.preventDefault(); ask(query) }}>
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder={c.placeholder} aria-label={c.placeholder}/>
        <button type="submit" className="action action-gold">{c.send}<Icon name="arrow" size={15}/></button>
      </form>

      <div className="companion-suggestions">
        <p className="eyebrow">{c.suggestedHeading}</p>
        <div className="flex flex-wrap justify-center" style={{ gap: 10 }}>
          {suggestedQuestions.map(question => <button key={question} type="button" className="companion-chip" onClick={() => ask(question)}>{question}</button>)}
        </div>
      </div>

      <p className="form-hint" style={{ textAlign: 'center', marginTop: 20 }}>{c.privacyNote}</p>
      <div className="flex justify-center" style={{ marginTop: 10 }}>
        <Link className="text-link" to="/gita/chapters">{c.exploreCta}<Icon name="arrow" size={14}/></Link>
      </div>
    </EditorialSection>
  </>
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { content, languageNames, languages, type Language } from '../content'
import { useLanguage } from './LanguageContext'
import { Icon } from './ui'

type NavKey = keyof typeof content.en.nav
type NavLeaf = { key: NavKey; href: string; icon?: string }
type NavItem = NavLeaf & { children?: NavLeaf[] }

const navItems: NavItem[] = [
  { key: 'mahotsav', href: '/#mahotsav' },
  { key: 'gita', href: '/gita', children: [
    { key: 'overview', href: '/gita', icon: 'book' }, { key: 'chapters', href: '/gita/chapters', icon: 'list' },
    { key: 'companion', href: '/gita/companion', icon: 'globe' }, { key: 'explorer', href: '/gita/explorer', icon: 'letters' },
  ] },
  { key: 'globalJourney', href: '/global-journey', children: [
    { key: 'globalOverview', href: '/global-journey', icon: 'globe' }, { key: 'countries', href: '/global-journey#countries', icon: 'countries' },
    { key: 'languages', href: '/global-journey/languages', icon: 'letters' }, { key: 'gallery', href: '/global-journey/gallery', icon: 'media' },
    { key: 'timeline', href: '/global-journey/timeline', icon: 'events' }, { key: 'unity', href: '/global-journey/unity', icon: 'people' },
  ] },
  { key: 'community', href: '/leadership', children: [
    { key: 'leadership', href: '/leadership', icon: 'people' }, { key: 'legacy', href: '/legacy', icon: 'book' },
  ] },
  { key: 'events', href: '/events', children: [
    { key: 'eventsAll', href: '/events', icon: 'events' }, { key: 'curtainRaiser', href: '/events/curtain-raiser', icon: 'calendar' },
    { key: 'vishwaMahotsav', href: '/events/vishwa-mahotsav', icon: 'calendar' }, { key: 'live', href: '/live', icon: 'checkin' },
  ] },
  { key: 'experience', href: '/experience', children: [
    { key: 'immersiveHeritage', href: '/experience', icon: 'globe' }, { key: 'recitationStudio', href: '/participant/recitation-studio', icon: 'letters' },
    { key: 'journey', href: '/participant/journey', icon: 'people' },
  ] },
  { key: 'about', href: '/about' },
]
const flagFor: Record<Language, string> = { en: '🇬🇧', hi: '🇮🇳', te: '🇮🇳' }

function isItemActive(item: NavItem, pathname: string) {
  const targets = [item.href, ...(item.children?.map(c => c.href) ?? [])].map(h => h.split('#')[0]).filter(Boolean)
  return targets.some(target => target !== '/' && (pathname === target || pathname.startsWith(target + '/')))
}

export function Brand({ lang }: { lang: Language }) {
  const t = content[lang]
  const location = useLocation()
  return <Link to="/" className="brand flex items-center" onClick={event => {
    if (location.pathname === '/') { event.preventDefault(); document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' }) }
  }}>
    <img src="/images/emblem-144.webp" width="47" height="47" alt="" />
    <span><strong>{t.title[0]} </strong><small>{t.title[1]} 2027</small><span className="sr-only"> · {t.home}</span></span>
  </Link>
}
export function LanguageSwitcher({ lang, onLanguage }: { lang: Language; onLanguage: (lang: Language) => void }) {
  return <label className="language-control">
    <span className="language-flag" aria-hidden="true">{flagFor[lang]}</span><span aria-hidden="true">{lang.toUpperCase()}</span><Icon name="down" size={12}/>
    <select aria-label={content[lang].language} value={lang} onChange={event => onLanguage(event.target.value as Language)}>
      {languages.map(code => <option key={code} lang={code} value={code}>{flagFor[code]} {languageNames[code]}</option>)}
    </select>
  </label>
}
function NavLink_({ item, lang, onNavigate }: { item: NavLeaf; lang: Language; onNavigate?: () => void }) {
  const t = content[lang]
  if (item.href.startsWith('http')) return <a href={item.href} onClick={onNavigate}>{item.icon && <Icon name={item.icon} size={15}/>}{t.nav[item.key]}</a>
  return <NavLink to={item.href} onClick={onNavigate} className={({ isActive }) => isActive && !item.href.includes('#') ? 'is-active' : ''}>
    {item.icon && <Icon name={item.icon} size={15}/>}{t.nav[item.key]}
  </NavLink>
}
function DesktopNavItem({ item, lang, onHover, setRef }: {
  item: NavItem; lang: Language; onHover: (key: string | null) => void; setRef: (el: HTMLLIElement | null) => void
}) {
  const t = content[lang]
  const [open, setOpen] = useState(false)
  if (!item.children) return <li ref={setRef} onMouseEnter={() => onHover(item.key)}><NavLink_ item={item} lang={lang}/></li>
  return <li className="nav-dropdown" ref={setRef} onMouseEnter={() => { setOpen(true); onHover(item.key) }} onMouseLeave={() => setOpen(false)}>
    <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(current => !current)}>
      {t.nav[item.key]}<Icon name="down" size={13}/>
    </button>
    {open && <ul className="nav-dropdown-panel" onClick={() => setOpen(false)}>
      {item.children.map((child, i) => <li key={child.href} style={{ transitionDelay: i * 25 + 'ms' }}><NavLink_ item={child} lang={lang}/></li>)}
    </ul>}
  </li>
}
export function MobileNavigation({ lang, close }: { lang: Language; close: () => void }) {
  const t = content[lang]
  return <nav id="mobile-navigation" className="mobile-nav" aria-label={t.navLabel}>
    <ul>{navItems.map((item, i) => <li key={item.href} style={{ transitionDelay: i * 30 + 'ms' }}>
      <NavLink_ item={item} lang={lang} onNavigate={close}/>
      {item.children && <ul className="mobile-subnav">{item.children.map(child => <li key={child.href}><NavLink_ item={child} lang={lang} onNavigate={close}/></li>)}</ul>}
    </li>)}</ul>
    <Link to="/participate" className="mobile-register" onClick={close}>{t.participate}<Icon name="arrow" size={15}/></Link>
  </nav>
}
export function SiteHeader() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLLIElement>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })
  const location = useLocation()
  const t = content[lang]

  const activeItem = navItems.find(item => isItemActive(item, location.pathname))

  function placeIndicator(key: string | null) {
    const nav = navRef.current
    const targetKey = key ?? activeItem?.key ?? null
    const el = targetKey ? itemRefs.current[targetKey] : null
    if (!nav || !el) { setIndicator(i => ({ ...i, visible: false })); return }
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setIndicator({ left: elRect.left - navRect.left, width: elRect.width, visible: true })
  }
  useLayoutEffect(() => { placeIndicator(null) }, [location.pathname])

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    const node = header.current
    if (!node) return
    const onScroll = () => node.classList.toggle('is-scrolled', window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => placeIndicator(null), { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent | FocusEvent) => { if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false) }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() } }
    const desktop = window.matchMedia('(min-width: 1281px)')
    const resize = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('focusin', dismiss)
    document.addEventListener('keydown', escape)
    desktop.addEventListener('change', resize)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('focusin', dismiss)
      document.removeEventListener('keydown', escape)
      desktop.removeEventListener('change', resize)
    }
  }, [open])
  return <header className="site-header" ref={header}>
    <Brand lang={lang}/>
    <div className="desktop-nav-wrap" ref={navRef} onMouseLeave={() => placeIndicator(null)}>
      <span className="nav-indicator" aria-hidden="true" style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width, opacity: indicator.visible ? 1 : 0 }}/>
      <ul className="desktop-nav" aria-label={t.navLabel}>
        {navItems.map(item => <DesktopNavItem key={item.href} item={item} lang={lang} onHover={placeIndicator}
          setRef={el => { if (el) itemRefs.current[item.key] = el }}/>)}
      </ul>
    </div>
    <div className="header-actions flex items-center">
      <LanguageSwitcher lang={lang} onLanguage={setLang}/>
      <Link className="register-link" to="/participate">{t.register}<Icon name="arrow" size={14}/></Link>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls={open ? 'mobile-navigation' : undefined} aria-label={open ? t.close : t.menu} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} size={21}/></button>
    </div>
    {open && <MobileNavigation lang={lang} close={() => setOpen(false)}/>}
  </header>
}

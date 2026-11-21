import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { animate } from 'motion/mini'
import { content } from '../content'
import { useLanguage } from './LanguageContext'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './WelcomeSections'

export function Layout() {
  const { lang } = useLanguage()
  const location = useLocation()
  const main = useRef<HTMLElement>(null)
  useEffect(() => {
    let cancelled = false
    if (location.hash) {
      const id = location.hash.slice(1)
      let attempts = 0
      const tryScroll = () => {
        if (cancelled) return
        const target = document.getElementById(id)
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); return }
        if (++attempts < 20) requestAnimationFrame(tryScroll)
        else window.scrollTo(0, 0)
      }
      tryScroll()
    } else {
      window.scrollTo(0, 0)
    }
    const node = main.current
    if (node && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      animate(node, { opacity: [0, 1] }, { duration: 0.32, ease: 'easeOut' })
    }
    return () => { cancelled = true }
  }, [location.pathname, location.hash])
  return <>
    <a className="skip-link" href="#main">{content[lang].skip}</a>
    <SiteHeader/>
    <main id="main" tabIndex={-1} ref={main}><Outlet/></main>
    <SiteFooter lang={lang}/>
  </>
}

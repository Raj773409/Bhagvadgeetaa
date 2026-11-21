import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { animate } from 'motion/mini'
import {
  ArrowRight, ArrowUp, BarChart3, Bell, BookOpen, Calendar, CalendarCheck, ChevronDown, ClipboardList,
  ExternalLink, FileText, Globe2, Handshake, History, Image, LayoutDashboard, LifeBuoy, Mail,
  Languages, Menu, QrCode, Settings, ShieldCheck, UserCog, Users, Wallet, X, type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  arrow: ArrowRight, external: ExternalLink, down: ChevronDown, calendar: Calendar,
  globe: Globe2, book: BookOpen, letters: Languages, people: Users, menu: Menu, close: X, up: ArrowUp,
  dashboard: LayoutDashboard, countries: Globe2, content: FileText, events: CalendarCheck, checkin: QrCode,
  finance: Wallet, partnerships: Handshake, communications: Bell, analytics: BarChart3, staff: UserCog,
  audit: History, settings: Settings, security: ShieldCheck, media: Image, support: LifeBuoy,
  mail: Mail, list: ClipboardList,
}
export function Icon({ name, size = 18, className = '' }: { name: keyof typeof icons; size?: number; className?: string }) {
  const Glyph = icons[name]
  return <Glyph aria-hidden="true" width={size} height={size} strokeWidth={1.6} className={className} />
}
export function IconBadge({ name, size = 22, className = '' }: { name: keyof typeof icons; size?: number; className?: string }) {
  return <span className={'icon-badge ' + className} aria-hidden="true"><Icon name={name} size={size}/></span>
}
export function CornerFrame() {
  return <span className="corner-frame" aria-hidden="true"><i/><i/><i/><i/></span>
}
export function OmGlyph() {
  return <div className="om-glyph" aria-hidden="true"><span>ॐ</span></div>
}
export function DecorativeOrnament({ variant = 'lotus' }: { variant?: 'lotus' | 'diamond' }) {
  return <span className={'ornament ' + variant} aria-hidden="true">{variant === 'lotus' ?
    <svg width="38" height="27" viewBox="0 0 48 34" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round"><path d="M24 27C14 21 17 10 24 3c7 7 10 18 0 24Zm0 0C12 28 6 19 6 11c8 1 15 5 18 16Zm0 0c12 1 18-8 18-16-8 1-15 5-18 16Z"/><path d="M24 28C12 32 4 27 1 20c7-1 12 1 16 5m7 3c12 4 20-1 23-8-7-1-12 1-16 5M14 32h20"/></svg> : <i />}</span>
}
export function PrimaryButton({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const className = 'action ' + (secondary ? 'action-outline' : 'action-gold')
  const icon = <Icon name={secondary ? 'external' : 'arrow'} size={16}/>
  if (href.startsWith('/') && !href.startsWith('//')) return <Link className={className} to={href}>{children}{icon}</Link>
  return <a className={className} href={href}>{children}{icon}</a>
}
export function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let playback: ReturnType<typeof animate> | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!preference.matches) playback = animate(node, { transform: ['translateY(12px)', 'translateY(0px)'], opacity: [0.8, 1] }, { duration: 0.5, ease: 'easeOut' })
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    const stop = () => { if (preference.matches) playback?.complete() }
    preference.addEventListener('change', stop)
    observer.observe(node)
    return () => { observer.disconnect(); playback?.stop(); preference.removeEventListener('change', stop) }
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

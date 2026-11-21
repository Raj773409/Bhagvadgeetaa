import { useMemo, useState } from 'react'
import type { MediaItem } from '../data/types'
import { Icon } from './ui'
import { EmptyState } from './shared'

export function MediaGallery({ items, emptyTitle, emptyBody, allLabel }: {
  items: MediaItem[]; emptyTitle: string; emptyBody: string; allLabel: string
}) {
  const [filter, setFilter] = useState<string>('all')
  const [open, setOpen] = useState<MediaItem | null>(null)
  const approved = useMemo(() => items.filter(item => item.approvalStatus === 'approved' && item.rightsStatus === 'cleared'), [items])
  const countries = useMemo(() => [...new Set(approved.map(item => item.countryId).filter(Boolean))], [approved])
  const visible = filter === 'all' ? approved : approved.filter(item => item.countryId === filter)

  if (approved.length === 0) return <EmptyState title={emptyTitle} body={emptyBody}/>

  return <div className="media-gallery">
    {countries.length > 1 && <div className="media-filters" role="tablist">
      <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{allLabel}</button>
      {countries.map(id => <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id!)}>{id}</button>)}
    </div>}
    <div className="media-grid">
      {visible.map(item => <button key={item.id} type="button" className="media-card" onClick={() => setOpen(item)}>
        <img src={item.thumbnailUrl} alt={item.altText} loading="lazy" decoding="async"/>
        {item.type === 'video' && <span className="media-play" aria-hidden="true"><Icon name="arrow" size={16}/></span>}
        <span className="media-caption">{item.caption}</span>
      </button>)}
    </div>
    {open && <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={open.caption} onClick={() => setOpen(null)}>
      <button type="button" className="media-lightbox-close" aria-label="Close" onClick={() => setOpen(null)}><Icon name="close" size={22}/></button>
      <figure onClick={event => event.stopPropagation()}>
        <img src={open.imageUrl} alt={open.altText}/>
        <figcaption>{open.caption}<cite>{open.credit}</cite></figcaption>
      </figure>
    </div>}
  </div>
}

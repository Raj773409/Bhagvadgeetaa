import { AdminCard, AdminPageHeader } from '../components/ui'

const tokens = [
  { name: 'Temple Ivory', value: '#F7F1E5' }, { name: 'Antique Gold', value: '#D9A650' },
  { name: 'Sacred Copper', value: '#A75A32' }, { name: 'Midnight Teal', value: '#18272D' },
  { name: 'Heritage Maroon', value: '#6A372B' },
]
export default function SettingsBrandingPage() {
  return <>
    <AdminPageHeader title="Branding" description="The colour tokens actually in use across the public site and this admin area." trail={['Settings', 'Branding']}/>
    <AdminCard title="Colour Tokens">
      <div className="admin-swatch-grid">
        {tokens.map(token => <div className="admin-swatch" key={token.name}>
          <span className="admin-swatch-chip" style={{ background: token.value }}/>
          <strong>{token.name}</strong><code>{token.value}</code>
        </div>)}
      </div>
    </AdminCard>
    <AdminCard title="Brand Assets">
      <p>Emblem: <code>/images/emblem-144.webp</code> — in use in the header, footer and this admin sidebar.</p>
    </AdminCard>
  </>
}

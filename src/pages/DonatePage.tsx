import { useState } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { CheckboxField } from '../components/forms'
import { DonationAmountSelector, IntegrationPendingNotice } from '../components/participation'
import { useDocumentMeta } from '../utils/seo'
import { donationPresets } from '../data/participation'

export default function DonatePage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const d = t.pages.donate
  useDocumentMeta(d.heading + ' · ' + t.title.join(' '), d.missionIntro)
  const [amount, setAmount] = useState<number | 'custom'>(donationPresets[1])
  const [consent, setConsent] = useState(false)
  const [attempted, setAttempted] = useState(false)

  return <>
    <InnerPageHero lang={lang} eyebrow={d.missionEyebrow} heading={d.heading} breadcrumb={[{ label: d.missionHeading, href: '/support-the-mission' }, { label: d.heading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={d.missionEyebrow} heading={d.amountsHeading} align="center"/>
      <div className="donate-panel">
        <DonationAmountSelector presets={donationPresets} value={amount} onSelect={setAmount} customLabel={d.customLabel} currencyNote={d.currencyNote}/>
        <p className="form-hint" style={{ textAlign: 'center' }}>{d.policyNote}</p>
        <CheckboxField label={d.consentLabel} checked={consent} onChange={setConsent}/>
        <div className="flex justify-center" style={{ marginTop: 20 }}>
          <button type="button" className="action action-gold" onClick={() => setAttempted(true)} disabled={!consent}>{d.checkoutCta}</button>
        </div>
        {attempted && <IntegrationPendingNotice title={d.unavailableTitle} body={d.unavailableBody}/>}
      </div>
    </EditorialSection>
  </>
}

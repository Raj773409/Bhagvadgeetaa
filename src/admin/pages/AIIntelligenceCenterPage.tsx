import { AdminCard, AdminEmptyNotice, AdminPageHeader, AdminStatusBadge, KPIStatCard } from '../components/ui'
import { checkTranslationCompleteness } from '../translationCheck'

const aiFeatures = [
  'Editorial review assistance', 'Duplicate content detection', 'Support ticket categorisation',
  'Suspicious registration pattern review', 'Media metadata assistance', 'Operational summaries',
]
export default function AIIntelligenceCenterPage() {
  const issues = checkTranslationCompleteness()
  return <>
    <AdminPageHeader title="Admin AI Intelligence Center" description="AI-powered assistance for content review, translations, support and operations (with human approval)." trail={['Admin AI Intelligence Center']}/>
    <div className="kpi-grid">
      <KPIStatCard label="AI Backend" value="Not connected"/>
      <KPIStatCard label="Translation Issues Found" value={String(issues.length)} hint="Real rule-based check, not AI"/>
      <KPIStatCard label="Human Approvals Pending" value="0"/>
    </div>
    <AdminCard title="Translation Structure Check" action={<AdminStatusBadge label="Rule-based, not AI" tone="neutral"/>}>
      {issues.length === 0
        ? <p>No empty or missing translation values were found across English, Hindi and Telugu copy. This is a real, deterministic check of the actual content file — not an AI judgement.</p>
        : <ul className="admin-checklist">{issues.map(issue => <li key={issue.path + issue.lang}><AdminStatusBadge label={issue.lang.toUpperCase()} tone="warning"/><span>{issue.path}</span></li>)}</ul>}
    </AdminCard>
    <AdminCard title="AI-Assisted Modules">
      <AdminEmptyNotice title="No AI backend is connected"
        body={'The following require a server-side AI service (e.g. an approved Gemini integration with retrieval, permissions and content filtering) that does not exist in this environment: ' + aiFeatures.join(', ') + '. None of these independently approve finance transactions, refunds, scripture changes, privileged access or participant eligibility even when connected — every sensitive action always requires human approval.'}/>
    </AdminCard>
    <AdminCard title="AI Activity Audit Trail">
      <AdminEmptyNotice title="No AI activity recorded" body="No AI action has ever been taken on this platform, so there is nothing to audit."/>
    </AdminCard>
  </>
}

import { lazy, StrictMode, Suspense, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/baskervville/latin-400.css'
import '@fontsource/baskervville/latin-400-italic.css'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import { content } from './content'
import { LanguageProvider, useLanguage } from './components/LanguageContext'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import HomePage from './pages/HomePage'
import './styles.css'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const GitaPage = lazy(() => import('./pages/GitaPage'))
const ChaptersPage = lazy(() => import('./pages/ChaptersPage'))
const ChapterDetailPage = lazy(() => import('./pages/ChapterDetailPage'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))
const LegacyPage = lazy(() => import('./pages/LegacyPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'))
const GlobalJourneyPage = lazy(() => import('./pages/GlobalJourneyPage'))
const LanguagesPage = lazy(() => import('./pages/LanguagesPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const GlobalTimelinePage = lazy(() => import('./pages/GlobalTimelinePage'))
const UnityPage = lazy(() => import('./pages/UnityPage'))
const CountryDetailPage = lazy(() => import('./pages/CountryDetailPage'))
const ParticipatePage = lazy(() => import('./pages/ParticipatePage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const GroupRegisterPage = lazy(() => import('./pages/GroupRegisterPage'))
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'))
const SupportMissionPage = lazy(() => import('./pages/SupportMissionPage'))
const DonatePage = lazy(() => import('./pages/DonatePage'))
const DonationsStatusPage = lazy(() => import('./pages/DonationsStatusPage'))
const DonationsReceiptsPage = lazy(() => import('./pages/DonationsReceiptsPage'))
const PartnerPage = lazy(() => import('./pages/PartnerPage'))
const VolunteerPage = lazy(() => import('./pages/VolunteerPage'))
const ApplicationsStatusPage = lazy(() => import('./pages/ApplicationsStatusPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const PassPage = lazy(() => import('./pages/PassPage'))
const PreparationPage = lazy(() => import('./pages/PreparationPage'))
const PreparationVersesPage = lazy(() => import('./pages/PreparationVersesPage'))
const CompanionPage = lazy(() => import('./pages/CompanionPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const ExplorerPage = lazy(() => import('./pages/ExplorerPage'))
const RecitationStudioPage = lazy(() => import('./pages/RecitationStudioPage'))
const LivePage = lazy(() => import('./pages/LivePage'))
const JourneyPage = lazy(() => import('./pages/JourneyPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const ReflectionsPage = lazy(() => import('./pages/ReflectionsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const AdminLayout = lazy(() => import('./admin/AdminLayout').then(m => ({ default: m.AdminLayout })))
const AdminDashboardPage = lazy(() => import('./admin/pages/DashboardPage'))
const AdminParticipantsPage = lazy(() => import('./admin/pages/ParticipantsPage'))
const AdminParticipantDetailPage = lazy(() => import('./admin/pages/ParticipantDetailPage'))
const AdminRegistrationsPage = lazy(() => import('./admin/pages/RegistrationsPage'))
const AdminCountriesPage = lazy(() => import('./admin/pages/CountriesPage'))
const AdminCountryDetailPage = lazy(() => import('./admin/pages/CountryDetailPage'))
const AdminCountryEditPage = lazy(() => import('./admin/pages/CountryEditPage'))
const AdminLanguagesPage = lazy(() => import('./admin/pages/LanguagesAdminPage'))
const AdminContentHubPage = lazy(() => import('./admin/pages/ContentHubPage'))
const AdminContentPagesPage = lazy(() => import('./admin/pages/ContentPagesPage'))
const AdminContentPageDetailPage = lazy(() => import('./admin/pages/ContentPageDetailPage'))
const AdminChaptersPage = lazy(() => import('./admin/pages/ChaptersAdminPage'))
const AdminVersesPage = lazy(() => import('./admin/pages/VersesAdminPage'))
const AdminMediaLibraryPage = lazy(() => import('./admin/pages/MediaLibraryPage'))
const AdminLeadershipPage = lazy(() => import('./admin/pages/LeadershipAdminPage'))
const AdminEventsPage = lazy(() => import('./admin/pages/EventsAdminPage'))
const AdminEventDetailPage = lazy(() => import('./admin/pages/EventDetailAdminPage'))
const AdminPassesPage = lazy(() => import('./admin/pages/PassesAdminPage'))
const AdminCheckinPage = lazy(() => import('./admin/pages/CheckinPage'))
const AdminCheckinHistoryPage = lazy(() => import('./admin/pages/CheckinHistoryPage'))
const AdminFinancePage = lazy(() => import('./admin/pages/FinancePage'))
const AdminFinanceDonationsPage = lazy(() => import('./admin/pages/FinanceDonationsPage'))
const AdminFinanceTransactionsPage = lazy(() => import('./admin/pages/FinanceTransactionsPage'))
const AdminFinanceReceiptsPage = lazy(() => import('./admin/pages/FinanceReceiptsPage'))
const AdminFinanceRefundsPage = lazy(() => import('./admin/pages/FinanceRefundsPage'))
const AdminPartnershipsPage = lazy(() => import('./admin/pages/PartnershipsAdminPage'))
const AdminVolunteersPage = lazy(() => import('./admin/pages/VolunteersAdminPage'))
const AdminSupportPage = lazy(() => import('./admin/pages/SupportAdminPage'))
const AdminCommunicationsPage = lazy(() => import('./admin/pages/CommunicationsPage'))
const AdminNotificationsPage = lazy(() => import('./admin/pages/NotificationsAdminPage'))
const AdminTemplatesPage = lazy(() => import('./admin/pages/TemplatesPage'))
const AdminStaffPage = lazy(() => import('./admin/pages/StaffPage'))
const AdminRolesPage = lazy(() => import('./admin/pages/RolesPage'))
const AdminAuditPage = lazy(() => import('./admin/pages/AuditPage'))
const AdminSecurityPage = lazy(() => import('./admin/pages/SecurityPage'))
const AdminAnalyticsPage = lazy(() => import('./admin/pages/AnalyticsPage'))
const AdminSettingsPage = lazy(() => import('./admin/pages/SettingsPage'))
const AdminSettingsBrandingPage = lazy(() => import('./admin/pages/SettingsBrandingPage'))
const AdminSettingsIntegrationsPage = lazy(() => import('./admin/pages/SettingsIntegrationsPage'))
const AdminSettingsLocalizationPage = lazy(() => import('./admin/pages/SettingsLocalizationPage'))
const AdminAIIntelligenceCenterPage = lazy(() => import('./admin/pages/AIIntelligenceCenterPage'))

function RouteFallback() {
  const { lang } = useLanguage()
  return <LoadingSkeleton label={content[lang].loading}/>
}
function AppErrorBoundary({ children }: { children: ReactNode }) {
  const { lang } = useLanguage()
  const t = content[lang].errorBoundary
  return <ErrorBoundary fallbackTitle={t.title} fallbackBody={t.body} retryLabel={t.retry}>{children}</ErrorBoundary>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AppErrorBoundary>
          <Suspense fallback={<RouteFallback/>}>
            <Routes>
              <Route element={<AdminLayout/>}>
                <Route path="/admin" element={<AdminDashboardPage/>}/>
                <Route path="/admin/participants" element={<AdminParticipantsPage/>}/>
                <Route path="/admin/participants/:id" element={<AdminParticipantDetailPage/>}/>
                <Route path="/admin/registrations" element={<AdminRegistrationsPage/>}/>
                <Route path="/admin/countries" element={<AdminCountriesPage/>}/>
                <Route path="/admin/countries/:countryId" element={<AdminCountryDetailPage/>}/>
                <Route path="/admin/countries/:countryId/edit" element={<AdminCountryEditPage/>}/>
                <Route path="/admin/languages" element={<AdminLanguagesPage/>}/>
                <Route path="/admin/content" element={<AdminContentHubPage/>}/>
                <Route path="/admin/content/pages" element={<AdminContentPagesPage/>}/>
                <Route path="/admin/content/pages/:id" element={<AdminContentPageDetailPage/>}/>
                <Route path="/admin/content/chapters" element={<AdminChaptersPage/>}/>
                <Route path="/admin/content/verses" element={<AdminVersesPage/>}/>
                <Route path="/admin/media" element={<AdminMediaLibraryPage/>}/>
                <Route path="/admin/leadership" element={<AdminLeadershipPage/>}/>
                <Route path="/admin/events" element={<AdminEventsPage/>}/>
                <Route path="/admin/events/:id" element={<AdminEventDetailPage/>}/>
                <Route path="/admin/passes" element={<AdminPassesPage/>}/>
                <Route path="/admin/checkin" element={<AdminCheckinPage/>}/>
                <Route path="/admin/checkin/history" element={<AdminCheckinHistoryPage/>}/>
                <Route path="/admin/finance" element={<AdminFinancePage/>}/>
                <Route path="/admin/finance/donations" element={<AdminFinanceDonationsPage/>}/>
                <Route path="/admin/finance/transactions" element={<AdminFinanceTransactionsPage/>}/>
                <Route path="/admin/finance/receipts" element={<AdminFinanceReceiptsPage/>}/>
                <Route path="/admin/finance/refunds" element={<AdminFinanceRefundsPage/>}/>
                <Route path="/admin/partnerships" element={<AdminPartnershipsPage/>}/>
                <Route path="/admin/volunteers" element={<AdminVolunteersPage/>}/>
                <Route path="/admin/support" element={<AdminSupportPage/>}/>
                <Route path="/admin/communications" element={<AdminCommunicationsPage/>}/>
                <Route path="/admin/notifications" element={<AdminNotificationsPage/>}/>
                <Route path="/admin/templates" element={<AdminTemplatesPage/>}/>
                <Route path="/admin/staff" element={<AdminStaffPage/>}/>
                <Route path="/admin/roles" element={<AdminRolesPage/>}/>
                <Route path="/admin/audit" element={<AdminAuditPage/>}/>
                <Route path="/admin/security" element={<AdminSecurityPage/>}/>
                <Route path="/admin/analytics" element={<AdminAnalyticsPage/>}/>
                <Route path="/admin/settings" element={<AdminSettingsPage/>}/>
                <Route path="/admin/settings/branding" element={<AdminSettingsBrandingPage/>}/>
                <Route path="/admin/settings/integrations" element={<AdminSettingsIntegrationsPage/>}/>
                <Route path="/admin/settings/localization" element={<AdminSettingsLocalizationPage/>}/>
                <Route path="/admin/ai-center" element={<AdminAIIntelligenceCenterPage/>}/>
                <Route path="/admin/*" element={<NotFoundPage/>}/>
              </Route>
              <Route element={<Layout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/gita" element={<GitaPage/>}/>
                <Route path="/gita/chapters" element={<ChaptersPage/>}/>
                <Route path="/gita/chapters/:chapterId" element={<ChapterDetailPage/>}/>
                <Route path="/leadership" element={<LeadershipPage/>}/>
                <Route path="/legacy" element={<LegacyPage/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/events/:eventSlug" element={<EventDetailPage/>}/>
                <Route path="/global-journey" element={<GlobalJourneyPage/>}/>
                <Route path="/global-journey/languages" element={<LanguagesPage/>}/>
                <Route path="/global-journey/gallery" element={<GalleryPage/>}/>
                <Route path="/global-journey/timeline" element={<GlobalTimelinePage/>}/>
                <Route path="/global-journey/unity" element={<UnityPage/>}/>
                <Route path="/global-journey/:countrySlug" element={<CountryDetailPage/>}/>
                <Route path="/participate" element={<ParticipatePage/>}/>
                <Route path="/participate/register" element={<RegisterPage/>}/>
                <Route path="/participate/group" element={<GroupRegisterPage/>}/>
                <Route path="/participate/confirmation" element={<ConfirmationPage/>}/>
                <Route path="/support-the-mission" element={<SupportMissionPage/>}/>
                <Route path="/donate" element={<DonatePage/>}/>
                <Route path="/donations/status" element={<DonationsStatusPage/>}/>
                <Route path="/donations/receipts" element={<DonationsReceiptsPage/>}/>
                <Route path="/partner-with-us" element={<PartnerPage/>}/>
                <Route path="/volunteer" element={<VolunteerPage/>}/>
                <Route path="/applications/status" element={<ApplicationsStatusPage/>}/>
                <Route path="/participant" element={<AccountPage/>}/>
                <Route path="/participant/profile" element={<AccountPage/>}/>
                <Route path="/participant/registrations" element={<AccountPage/>}/>
                <Route path="/participant/notifications" element={<AccountPage/>}/>
                <Route path="/participant/support" element={<AccountPage/>}/>
                <Route path="/participant/pass" element={<PassPage/>}/>
                <Route path="/participant/pass/:passId" element={<PassPage/>}/>
                <Route path="/participant/preparation" element={<PreparationPage/>}/>
                <Route path="/participant/preparation/verses" element={<PreparationVersesPage/>}/>
                <Route path="/gita/companion" element={<CompanionPage/>}/>
                <Route path="/experience" element={<ExperiencePage/>}/>
                <Route path="/gita/explorer" element={<ExplorerPage/>}/>
                <Route path="/participant/recitation-studio" element={<RecitationStudioPage/>}/>
                <Route path="/live" element={<LivePage/>}/>
                <Route path="/participant/journey" element={<JourneyPage/>}/>
                <Route path="/participant/bookmarks" element={<BookmarksPage/>}/>
                <Route path="/participant/reflections" element={<ReflectionsPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
              </Route>
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)

import type { RowDataPacket } from 'mysql2'
import { pool } from './pool.js'

/**
 * Seeds ONLY verified reference data, duplicated from the frontend's already-reviewed
 * src/data/{countries,chapters,events}.ts and src/content.ts so both sides agree, since the
 * two are separate TypeScript projects and don't share modules. No participants, donations,
 * leaders, coordinators, media or transactions are ever seeded — those stay empty until real
 * ones exist. Idempotent: safe to run more than once (uses INSERT ... ON DUPLICATE KEY UPDATE).
 */

const languages = [
  { code: 'sa', name_en: 'Sanskrit', native_name: 'संस्कृतम्', script: 'Devanagari', is_interface_language: 0, is_scripture_language: 1 },
  { code: 'en', name_en: 'English', native_name: 'English', script: 'Latin', is_interface_language: 1, is_scripture_language: 1 },
  { code: 'hi', name_en: 'Hindi', native_name: 'हिन्दी', script: 'Devanagari', is_interface_language: 1, is_scripture_language: 1 },
  { code: 'te', name_en: 'Telugu', native_name: 'తెలుగు', script: 'Telugu', is_interface_language: 1, is_scripture_language: 1 },
]

const countries = [
  { slug: 'india', iso_code: 'IN', flag_emoji: '🇮🇳', name_en: 'India', name_hi: 'भारत', name_te: 'భారతదేశం', lat: 28.6139, lng: 77.2090, langs: 'Hindi, English, Telugu & 20+ others', is_origin: 1 },
  { slug: 'united-states', iso_code: 'US', flag_emoji: '🇺🇸', name_en: 'United States', name_hi: 'संयुक्त राज्य अमेरिका', name_te: 'అమెరికా సంయుక్త రాష్ట్రాలు', lat: 38.9072, lng: -77.0369, langs: 'English', is_origin: 0 },
  { slug: 'canada', iso_code: 'CA', flag_emoji: '🇨🇦', name_en: 'Canada', name_hi: 'कनाडा', name_te: 'కెనడా', lat: 45.4215, lng: -75.6972, langs: 'English & French', is_origin: 0 },
  { slug: 'brazil', iso_code: 'BR', flag_emoji: '🇧🇷', name_en: 'Brazil', name_hi: 'ब्राज़ील', name_te: 'బ్రెజిల్', lat: -15.8267, lng: -47.9218, langs: 'Portuguese', is_origin: 0 },
  { slug: 'south-africa', iso_code: 'ZA', flag_emoji: '🇿🇦', name_en: 'South Africa', name_hi: 'दक्षिण अफ़्रीका', name_te: 'దక్షిణాఫ్రికా', lat: -25.7479, lng: 28.2293, langs: 'English & 10 other official languages', is_origin: 0 },
  { slug: 'united-kingdom', iso_code: 'GB', flag_emoji: '🇬🇧', name_en: 'United Kingdom', name_hi: 'यूनाइटेड किंगडम', name_te: 'యునైటెడ్ కింగ్‌డమ్', lat: 51.5074, lng: -0.1278, langs: 'English', is_origin: 0 },
  { slug: 'ireland', iso_code: 'IE', flag_emoji: '🇮🇪', name_en: 'Ireland', name_hi: 'आयरलैंड', name_te: 'ఐర్లాండ్', lat: 53.3498, lng: -6.2603, langs: 'English & Irish (Gaeilge)', is_origin: 0 },
  { slug: 'france', iso_code: 'FR', flag_emoji: '🇫🇷', name_en: 'France', name_hi: 'फ़्रांस', name_te: 'ఫ్రాన్స్', lat: 48.8566, lng: 2.3522, langs: 'French', is_origin: 0 },
  { slug: 'germany', iso_code: 'DE', flag_emoji: '🇩🇪', name_en: 'Germany', name_hi: 'जर्मनी', name_te: 'జర్మనీ', lat: 52.5200, lng: 13.4050, langs: 'German', is_origin: 0 },
  { slug: 'italy', iso_code: 'IT', flag_emoji: '🇮🇹', name_en: 'Italy', name_hi: 'इटली', name_te: 'ఇటలీ', lat: 41.9028, lng: 12.4964, langs: 'Italian', is_origin: 0 },
  { slug: 'spain', iso_code: 'ES', flag_emoji: '🇪🇸', name_en: 'Spain', name_hi: 'स्पेन', name_te: 'స్పెయిన్', lat: 40.4168, lng: -3.7038, langs: 'Spanish', is_origin: 0 },
  { slug: 'netherlands', iso_code: 'NL', flag_emoji: '🇳🇱', name_en: 'Netherlands', name_hi: 'नीदरलैंड', name_te: 'నెదర్లాండ్స్', lat: 52.3676, lng: 4.9041, langs: 'Dutch', is_origin: 0 },
  { slug: 'russia', iso_code: 'RU', flag_emoji: '🇷🇺', name_en: 'Russia', name_hi: 'रूस', name_te: 'రష్యా', lat: 55.7558, lng: 37.6173, langs: 'Russian', is_origin: 0 },
  { slug: 'china', iso_code: 'CN', flag_emoji: '🇨🇳', name_en: 'China', name_hi: 'चीन', name_te: 'చైనా', lat: 39.9042, lng: 116.4074, langs: 'Mandarin Chinese', is_origin: 0 },
  { slug: 'japan', iso_code: 'JP', flag_emoji: '🇯🇵', name_en: 'Japan', name_hi: 'जापान', name_te: 'జపాన్', lat: 35.6762, lng: 139.6503, langs: 'Japanese', is_origin: 0 },
  { slug: 'united-arab-emirates', iso_code: 'AE', flag_emoji: '🇦🇪', name_en: 'United Arab Emirates', name_hi: 'संयुक्त अरब अमीरात', name_te: 'యునైటెడ్ అరబ్ ఎమిరేట్స్', lat: 24.4539, lng: 54.3773, langs: 'Arabic (official); English widely used', is_origin: 0 },
  { slug: 'australia', iso_code: 'AU', flag_emoji: '🇦🇺', name_en: 'Australia', name_hi: 'ऑस्ट्रेलिया', name_te: 'ఆస్ట్రేలియా', lat: -35.2809, lng: 149.1300, langs: 'English', is_origin: 0 },
  { slug: 'new-zealand', iso_code: 'NZ', flag_emoji: '🇳🇿', name_en: 'New Zealand', name_hi: 'न्यूज़ीलैंड', name_te: 'న్యూజిలాండ్', lat: -41.2865, lng: 174.7762, langs: 'English & Māori', is_origin: 0 },
]

const chapters = [
  { id: 1, sanskrit: 'अर्जुनविषादयोगः', transliteration: 'Arjuna Viṣāda Yoga', titleEn: "Arjuna's Despondency", titleTe: 'అర్జున విషాద యోగం', verses: 47,
    themeEn: 'Arjuna\'s moral crisis on the battlefield of Kurukshetra.', themeHi: 'कुरुक्षेत्र के रणभूमि में अर्जुन की मानसिक दुविधा।', themeTe: 'కురుక్షేత్ర రణరంగంలో అర్జునుడి మానసిక సంఘర్షణ.' },
  { id: 2, sanskrit: 'साङ्ख्ययोगः', transliteration: 'Sāṅkhya Yoga', titleEn: 'The Yoga of Knowledge', titleTe: 'సాంఖ్య యోగం', verses: 72,
    themeEn: 'Krishna introduces the imperishable soul and the path of steady wisdom.', themeHi: 'कृष्ण अविनाशी आत्मा और स्थिर बुद्धि के मार्ग का परिचय देते हैं।', themeTe: 'అవినాశియైన ఆత్మ, స్థిర బుద్ధి మార్గాన్ని కృష్ణుడు పరిచయం చేస్తాడు.' },
  { id: 3, sanskrit: 'कर्मयोगः', transliteration: 'Karma Yoga', titleEn: 'The Yoga of Action', titleTe: 'కర్మ యోగం', verses: 43,
    themeEn: 'The call to selfless action, performed without attachment to results.', themeHi: 'फल की चिंता किए बिना निष्काम कर्म करने का आह्वान।', themeTe: 'ఫలితాలపై ఆసక్తి లేకుండా నిష్కామ కర్మ చేయమని పిలుపు.' },
  { id: 4, sanskrit: 'ज्ञानकर्मसंन्यासयोगः', transliteration: 'Jñāna Karma Sanyāsa Yoga', titleEn: 'Knowledge and the Discipline of Action', titleTe: 'జ్ఞాన కర్మ సన్యాస యోగం', verses: 42,
    themeEn: 'How divine knowledge descends through the ages, uniting action and wisdom.', themeHi: 'दिव्य ज्ञान की परंपरा और कर्म-ज्ञान के समन्वय का वर्णन।', themeTe: 'దివ్య జ్ఞాన పరంపర, కర్మ-జ్ఞానాల సమన్వయం.' },
  { id: 5, sanskrit: 'कर्मसंन्यासयोगः', transliteration: 'Karma Sanyāsa Yoga', titleEn: 'The Yoga of Renunciation of Action', titleTe: 'కర్మ సన్యాస యోగం', verses: 29,
    themeEn: 'Comparing renunciation of action with the yoga of selfless action.', themeHi: 'कर्मसंन्यास और निष्काम कर्मयोग की तुलना।', themeTe: 'కర్మ సన్యాసం, నిష్కామ కర్మయోగాల పోలిక.' },
  { id: 6, sanskrit: 'ध्यानयोगः', transliteration: 'Dhyāna Yoga', titleEn: 'The Yoga of Meditation', titleTe: 'ధ్యాన యోగం', verses: 47,
    themeEn: 'The discipline of meditation and mastery of the restless mind.', themeHi: 'ध्यान का अनुशासन और चंचल मन पर नियंत्रण।', themeTe: 'ధ్యాన క్రమశిక్షణ, చంచలమైన మనసుపై నియంత్రణ.' },
  { id: 7, sanskrit: 'ज्ञानविज्ञानयोगः', transliteration: 'Jñāna Vijñāna Yoga', titleEn: 'Knowledge and Wisdom', titleTe: 'జ్ఞాన విజ్ఞాన యోగం', verses: 30,
    themeEn: "Krishna's nature as both the manifest world and its unseen source.", themeHi: 'कृष्ण की प्रकट प्रकृति और उसके अदृश्य स्रोत का वर्णन।', themeTe: 'కృష్ణుని వ్యక్త ప్రకృతి, దాని అవ్యక్త మూలం.' },
  { id: 8, sanskrit: 'अक्षरब्रह्मयोगः', transliteration: 'Akṣara Brahma Yoga', titleEn: 'The Imperishable Brahman', titleTe: 'అక్షర బ్రహ్మ యోగం', verses: 28,
    themeEn: 'The eternal principle beyond birth and death, reached at the hour of death.', themeHi: 'जन्म-मृत्यु से परे शाश्वत तत्व, जो अंतकाल में प्राप्त होता है।', themeTe: 'జన్మ-మృత్యువులకు అతీతమైన శాశ్వత తత్వం, అంతకాలంలో పొందేది.' },
  { id: 9, sanskrit: 'राजविद्याराजगुह्ययोगः', transliteration: 'Rāja Vidyā Rāja Guhya Yoga', titleEn: 'Royal Knowledge, Royal Secret', titleTe: 'రాజవిద్యా రాజగుహ్య యోగం', verses: 34,
    themeEn: 'The most confidential knowledge, revealing divine love as the highest path.', themeHi: 'सबसे गोपनीय ज्ञान, जो भक्ति को सर्वोच्च मार्ग बताता है।', themeTe: 'అత్యంత రహస్యమైన జ్ఞానం, భక్తిని అత్యున్నత మార్గంగా చూపేది.' },
  { id: 10, sanskrit: 'विभूतियोगः', transliteration: 'Vibhūti Yoga', titleEn: 'The Yoga of Divine Glories', titleTe: 'విభూతి యోగం', verses: 42,
    themeEn: "Krishna's infinite glories manifest throughout creation.", themeHi: 'सम्पूर्ण सृष्टि में व्याप्त कृष्ण की अनंत विभूतियाँ।', themeTe: 'సృష్టి అంతటా వ్యాపించిన కృష్ణుని అనంత విభూతులు.' },
  { id: 11, sanskrit: 'विश्वरूपदर्शनयोगः', transliteration: 'Viśvarūpa Darśana Yoga', titleEn: 'The Vision of the Universal Form', titleTe: 'విశ్వరూప దర్శన యోగం', verses: 55,
    themeEn: "Arjuna beholds Krishna's cosmic, all-encompassing form.", themeHi: 'अर्जुन द्वारा कृष्ण के विराट विश्वरूप का दर्शन।', themeTe: 'కృష్ణుని విశ్వరూప దర్శనం అర్జునుడికి లభించడం.' },
  { id: 12, sanskrit: 'भक्तियोगः', transliteration: 'Bhakti Yoga', titleEn: 'The Yoga of Devotion', titleTe: 'భక్తి యోగం', verses: 20,
    themeEn: 'The path of loving devotion to the Divine.', themeHi: 'ईश्वर के प्रति प्रेमपूर्ण भक्ति का मार्ग।', themeTe: 'దేవుని పట్ల ప్రేమపూర్వక భక్తి మార్గం.' },
  { id: 13, sanskrit: 'क्षेत्रक्षेत्रज्ञविभागयोगः', transliteration: 'Kṣetra Kṣetrajña Vibhāga Yoga', titleEn: 'The Field and its Knower', titleTe: 'క్షేత్ర క్షేత్రజ్ఞ విభాగ యోగం', verses: 34,
    themeEn: 'Distinguishing the body, the field of action, from the eternal knower within.', themeHi: 'शरीर रूपी क्षेत्र और उसके भीतर के शाश्वत ज्ञाता का भेद।', themeTe: 'శరీరమనే క్షేత్రం, దానిలోని శాశ్వత జ్ఞాత మధ్య భేదం.' },
  { id: 14, sanskrit: 'गुणत्रयविभागयोगः', transliteration: 'Guṇatraya Vibhāga Yoga', titleEn: 'The Three Qualities of Nature', titleTe: 'గుణత్రయ విభాగ యోగం', verses: 27,
    themeEn: 'The three qualities of nature — goodness, passion and inertia — and rising above them.', themeHi: 'प्रकृति के तीन गुण — सत्व, रज, तम — और उनसे ऊपर उठने का मार्ग।', themeTe: 'ప్రకృతి త్రిగుణాలు — సత్వ, రజ, తమ — వాటిని మించి ఎదగడం.' },
  { id: 15, sanskrit: 'पुरुषोत्तमयोगः', transliteration: 'Puruṣottama Yoga', titleEn: 'The Supreme Person', titleTe: 'పురుషోత్తమ యోగం', verses: 20,
    themeEn: 'The Supreme Person beyond the perishable and the imperishable.', themeHi: 'नश्वर और अविनाशी से परे परम पुरुष का वर्णन।', themeTe: 'నశ్వర, అవినాశీలకు అతీతమైన పురుషోత్తముని వర్ణన.' },
  { id: 16, sanskrit: 'दैवासुरसम्पद्विभागयोगः', transliteration: 'Daivāsura Sampad Vibhāga Yoga', titleEn: 'The Divine and Demoniac Natures', titleTe: 'దైవాసుర సంపద్విభాగ యోగం', verses: 24,
    themeEn: 'Contrasting divine and demoniac tendencies within human nature.', themeHi: 'मानव स्वभाव में दैवी और आसुरी प्रवृत्तियों का अंतर।', themeTe: 'మానవ స్వభావంలో దైవిక, ఆసురిక ప్రవృత్తుల వ్యత్యాసం.' },
  { id: 17, sanskrit: 'श्रद्धात्रयविभागयोगः', transliteration: 'Śraddhātraya Vibhāga Yoga', titleEn: 'The Threefold Faith', titleTe: 'శ్రద్ధాత్రయ విభాగ యోగం', verses: 28,
    themeEn: "The threefold nature of faith, shaped by one's inherent qualities.", themeHi: 'श्रद्धा के तीन रूप, जो व्यक्ति के स्वभाव से निर्धारित होते हैं।', themeTe: 'వ్యక్తి స్వభావాన్ని బట్టి ఏర్పడే శ్రద్ధ యొక్క మూడు రూపాలు.' },
  { id: 18, sanskrit: 'मोक्षसंन्यासयोगः', transliteration: 'Mokṣa Sanyāsa Yoga', titleEn: 'Liberation through Renunciation', titleTe: 'మోక్ష సన్యాస యోగం', verses: 78,
    themeEn: 'The culmination — liberation through knowledge, renunciation and surrender.', themeHi: 'समापन — ज्ञान, संन्यास और समर्पण के माध्यम से मोक्ष।', themeTe: 'ముగింపు — జ్ఞానం, సన్యాసం, శరణాగతి ద్వారా మోక్షం.' },
]

// Mirrors the RBAC model documented in the frontend's src/admin/permissions.ts, so the admin
// preview-role switcher and this real enforcement layer describe the same roles.
const permissionSlugs = [
  'dashboard.view', 'participants.view', 'participants.review', 'countries.view', 'countries.edit', 'countries.publish',
  'content.view', 'content.edit', 'content.publish', 'content.scripture.edit', 'events.view', 'events.edit', 'checkin.operate',
  'finance.view', 'finance.refund', 'partnerships.view', 'partnerships.review', 'volunteers.view', 'volunteers.review',
  'support.view', 'support.respond', 'communications.view', 'communications.send', 'analytics.view',
  'staff.view', 'staff.manage', 'roles.manage', 'audit.view', 'settings.view', 'settings.manage', 'ai.view',
]
const rolePermissions: Record<string, string[]> = {
  super_administrator: permissionSlugs,
  platform_administrator: permissionSlugs.filter(p => !['staff.manage', 'roles.manage'].includes(p)),
  event_manager: ['dashboard.view', 'events.view', 'events.edit', 'checkin.operate', 'participants.view', 'audit.view'],
  country_coordinator: ['dashboard.view', 'countries.view', 'countries.edit', 'participants.view', 'content.view'],
  content_editor: ['dashboard.view', 'content.view', 'content.edit', 'ai.view'],
  scripture_reviewer: ['dashboard.view', 'content.view', 'content.scripture.edit', 'content.publish'],
  registration_reviewer: ['dashboard.view', 'participants.view', 'participants.review', 'audit.view'],
  finance_manager: ['dashboard.view', 'finance.view', 'finance.refund', 'audit.view'],
  support_officer: ['dashboard.view', 'support.view', 'support.respond'],
  checkin_staff: ['checkin.operate'],
}

const events = [
  { slug: 'curtain-raiser', title_key: 'curtainRaiser', event_date: '2026-12-20' },
  { slug: 'vishwa-mahotsav', title_key: 'vishwaMahotsav', event_date: '2027-02-27' },
]

async function seed() {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    for (const lang of languages) {
      await connection.query(
        `INSERT INTO languages (code, name_en, native_name, script, is_interface_language, is_scripture_language)
         VALUES (:code, :name_en, :native_name, :script, :is_interface_language, :is_scripture_language)
         ON DUPLICATE KEY UPDATE name_en=VALUES(name_en), native_name=VALUES(native_name), script=VALUES(script),
           is_interface_language=VALUES(is_interface_language), is_scripture_language=VALUES(is_scripture_language)`,
        lang,
      )
    }
    console.log(`Seeded ${languages.length} languages.`)

    for (const slug of permissionSlugs) {
      await connection.query(
        `INSERT INTO permissions (slug, label) VALUES (:slug, :slug) ON DUPLICATE KEY UPDATE label=VALUES(label)`,
        { slug },
      )
    }
    for (const roleSlug of Object.keys(rolePermissions)) {
      const label = roleSlug.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
      await connection.query(
        `INSERT INTO roles (slug, label) VALUES (:slug, :label) ON DUPLICATE KEY UPDATE label=VALUES(label)`,
        { slug: roleSlug, label },
      )
      const [[roleRow]] = await connection.query<RowDataPacket[]>(`SELECT id FROM roles WHERE slug = ?`, [roleSlug])
      for (const permSlug of rolePermissions[roleSlug]) {
        const [[permRow]] = await connection.query<RowDataPacket[]>(`SELECT id FROM permissions WHERE slug = ?`, [permSlug])
        await connection.query(
          `INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (:roleId, :permId)`,
          { roleId: roleRow.id, permId: permRow.id },
        )
      }
    }
    console.log(`Seeded ${permissionSlugs.length} permissions across ${Object.keys(rolePermissions).length} roles.`)

    for (const c of countries) {
      await connection.query(
        `INSERT INTO countries (slug, iso_code, flag_emoji, name_en, name_hi, name_te, latitude, longitude, national_languages, is_origin, publication_status)
         VALUES (:slug, :iso_code, :flag_emoji, :name_en, :name_hi, :name_te, :lat, :lng, :langs, :is_origin, 'published')
         ON DUPLICATE KEY UPDATE name_en=VALUES(name_en), name_hi=VALUES(name_hi), name_te=VALUES(name_te),
           latitude=VALUES(latitude), longitude=VALUES(longitude), national_languages=VALUES(national_languages), is_origin=VALUES(is_origin)`,
        c,
      )
    }
    console.log(`Seeded ${countries.length} countries.`)

    for (const ch of chapters) {
      await connection.query(
        `INSERT INTO gita_chapters (id, sanskrit_title, transliteration, title_en, title_te, verse_count, theme_en, theme_hi, theme_te)
         VALUES (:id, :sanskrit, :transliteration, :titleEn, :titleTe, :verses, :themeEn, :themeHi, :themeTe)
         ON DUPLICATE KEY UPDATE sanskrit_title=VALUES(sanskrit_title), transliteration=VALUES(transliteration),
           title_en=VALUES(title_en), title_te=VALUES(title_te), verse_count=VALUES(verse_count),
           theme_en=VALUES(theme_en), theme_hi=VALUES(theme_hi), theme_te=VALUES(theme_te)`,
        ch,
      )
    }
    console.log(`Seeded ${chapters.length} Gita chapters.`)

    for (const e of events) {
      await connection.query(
        `INSERT INTO events (slug, title_key, event_date, status)
         VALUES (:slug, :title_key, :event_date, 'upcoming')
         ON DUPLICATE KEY UPDATE title_key=VALUES(title_key), event_date=VALUES(event_date)`,
        e,
      )
    }
    console.log(`Seeded ${events.length} events.`)

    await connection.query(
      `INSERT INTO scripture_sources (name, url, rights_status)
       VALUES ('IIT Kanpur Heritage — Shrimad Bhagavad Gita', 'https://heritage.iitk.ac.in/SBG/2.47', 'public_domain')
       ON DUPLICATE KEY UPDATE name=VALUES(name)`,
    )
    const [[sourceRow]] = await connection.query<RowDataPacket[]>(`SELECT id FROM scripture_sources WHERE url = ?`, ['https://heritage.iitk.ac.in/SBG/2.47'])
    const sourceId = sourceRow.id

    await connection.query(
      `INSERT INTO gita_verses (chapter_id, verse_number, sanskrit_text, source_id, publication_status)
       VALUES (2, 47, :sanskrit, :sourceId, 'published')
       ON DUPLICATE KEY UPDATE sanskrit_text=VALUES(sanskrit_text), publication_status='published'`,
      { sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥', sourceId },
    )
    const [[verseRow]] = await connection.query<RowDataPacket[]>(`SELECT id FROM gita_verses WHERE chapter_id = 2 AND verse_number = 47`)
    const verseId = verseRow.id

    const translations = [
      { lang: 'en', text: 'Thy right is to work only, but never with its fruits.', attribution: 'Swami Sivananda · Translation excerpt' },
      { lang: 'hi', text: 'कर्म पर ही तुम्हारा अधिकार है, उसके फल पर कभी नहीं।', attribution: 'प्रथम पंक्ति का भावार्थ' },
      { lang: 'te', text: 'నీకు కర్మ చేయడంలోనే అధికారం ఉంది. దాని ఫలాలపై ఎన్నడూ లేదు.', attribution: 'మొదటి పాదం భావం' },
    ]
    for (const t of translations) {
      const [[langRow]] = await connection.query<RowDataPacket[]>(`SELECT id FROM languages WHERE code = ?`, [t.lang])
      await connection.query(
        `INSERT INTO verse_translations (verse_id, language_id, translation_text, attribution)
         VALUES (:verseId, :languageId, :text, :attribution)
         ON DUPLICATE KEY UPDATE translation_text=VALUES(translation_text), attribution=VALUES(attribution)`,
        { verseId, languageId: langRow.id, text: t.text, attribution: t.attribution },
      )
    }
    console.log('Seeded the one verified verse (Chapter 2, Verse 47) with its 3 translations.')

    await connection.commit()
    console.log('Seed complete.')
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
    await pool.end()
  }
}

seed()

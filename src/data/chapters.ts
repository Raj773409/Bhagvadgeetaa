import type { Chapter } from './types'

/**
 * Traditional chapter structure of the Bhagavad Gita: Sanskrit colophon titles,
 * standard transliteration and verse counts as published across established editions
 * (totalling the traditional 700 verses). Full verse-by-verse Sanskrit, transliteration
 * and translation are intentionally withheld until sourced from an approved, rights-cleared
 * translation corpus — see VerseDisplay's editorial-pending state.
 */
export const chapters: Chapter[] = [
  { id: 1, sanskrit: 'अर्जुनविषादयोगः', transliteration: 'Arjuna Viṣāda Yoga', titleEn: "Arjuna's Despondency", titleTe: 'అర్జున విషాద యోగం', verses: 47,
    theme: { en: "Arjuna's moral crisis on the battlefield of Kurukshetra.", hi: 'कुरुक्षेत्र के रणभूमि में अर्जुन की मानसिक दुविधा।', te: 'కురుక్షేత్ర రణరంగంలో అర్జునుడి మానసిక సంఘర్షణ.' } },
  { id: 2, sanskrit: 'साङ्ख्ययोगः', transliteration: 'Sāṅkhya Yoga', titleEn: 'The Yoga of Knowledge', titleTe: 'సాంఖ్య యోగం', verses: 72,
    theme: { en: 'Krishna introduces the imperishable soul and the path of steady wisdom.', hi: 'कृष्ण अविनाशी आत्मा और स्थिर बुद्धि के मार्ग का परिचय देते हैं।', te: 'అవినాశియైన ఆత్మ, స్థిర బుద్ధి మార్గాన్ని కృష్ణుడు పరిచయం చేస్తాడు.' } },
  { id: 3, sanskrit: 'कर्मयोगः', transliteration: 'Karma Yoga', titleEn: 'The Yoga of Action', titleTe: 'కర్మ యోగం', verses: 43,
    theme: { en: 'The call to selfless action, performed without attachment to results.', hi: 'फल की चिंता किए बिना निष्काम कर्म करने का आह्वान।', te: 'ఫలితాలపై ఆసక్తి లేకుండా నిష్కామ కర్మ చేయమని పిలుపు.' } },
  { id: 4, sanskrit: 'ज्ञानकर्मसंन्यासयोगः', transliteration: 'Jñāna Karma Sanyāsa Yoga', titleEn: 'Knowledge and the Discipline of Action', titleTe: 'జ్ఞాన కర్మ సన్యాస యోగం', verses: 42,
    theme: { en: 'How divine knowledge descends through the ages, uniting action and wisdom.', hi: 'दिव्य ज्ञान की परंपरा और कर्म-ज्ञान के समन्वय का वर्णन।', te: 'దివ్య జ్ఞాన పరంపర, కర్మ-జ్ఞానాల సమన్వయం.' } },
  { id: 5, sanskrit: 'कर्मसंन्यासयोगः', transliteration: 'Karma Sanyāsa Yoga', titleEn: 'The Yoga of Renunciation of Action', titleTe: 'కర్మ సన్యాస యోగం', verses: 29,
    theme: { en: 'Comparing renunciation of action with the yoga of selfless action.', hi: 'कर्मसंन्यास और निष्काम कर्मयोग की तुलना।', te: 'కర్మ సన్యాసం, నిష్కామ కర్మయోగాల పోలిక.' } },
  { id: 6, sanskrit: 'ध्यानयोगः', transliteration: 'Dhyāna Yoga', titleEn: 'The Yoga of Meditation', titleTe: 'ధ్యాన యోగం', verses: 47,
    theme: { en: 'The discipline of meditation and mastery of the restless mind.', hi: 'ध्यान का अनुशासन और चंचल मन पर नियंत्रण।', te: 'ధ్యాన క్రమశిక్షణ, చంచలమైన మనసుపై నియంత్రణ.' } },
  { id: 7, sanskrit: 'ज्ञानविज्ञानयोगः', transliteration: 'Jñāna Vijñāna Yoga', titleEn: 'Knowledge and Wisdom', titleTe: 'జ్ఞాన విజ్ఞాన యోగం', verses: 30,
    theme: { en: "Krishna's nature as both the manifest world and its unseen source.", hi: 'कृष्ण की प्रकट प्रकृति और उसके अदृश्य स्रोत का वर्णन।', te: 'కృష్ణుని వ్యక్త ప్రకృతి, దాని అవ్యక్త మూలం.' } },
  { id: 8, sanskrit: 'अक्षरब्रह्मयोगः', transliteration: 'Akṣara Brahma Yoga', titleEn: 'The Imperishable Brahman', titleTe: 'అక్షర బ్రహ్మ యోగం', verses: 28,
    theme: { en: 'The eternal principle beyond birth and death, reached at the hour of death.', hi: 'जन्म-मृत्यु से परे शाश्वत तत्व, जो अंतकाल में प्राप्त होता है।', te: 'జన్మ-మృత్యువులకు అతీతమైన శాశ్వత తత్వం, అంతకాలంలో పొందేది.' } },
  { id: 9, sanskrit: 'राजविद्याराजगुह्ययोगः', transliteration: 'Rāja Vidyā Rāja Guhya Yoga', titleEn: 'Royal Knowledge, Royal Secret', titleTe: 'రాజవిద్యా రాజగుహ్య యోగం', verses: 34,
    theme: { en: 'The most confidential knowledge, revealing divine love as the highest path.', hi: 'सबसे गोपनीय ज्ञान, जो भक्ति को सर्वोच्च मार्ग बताता है।', te: 'అత్యంత రహస్యమైన జ్ఞానం, భక్తిని అత్యున్నత మార్గంగా చూపేది.' } },
  { id: 10, sanskrit: 'विभूतियोगः', transliteration: 'Vibhūti Yoga', titleEn: 'The Yoga of Divine Glories', titleTe: 'విభూతి యోగం', verses: 42,
    theme: { en: "Krishna's infinite glories manifest throughout creation.", hi: 'सम्पूर्ण सृष्टि में व्याप्त कृष्ण की अनंत विभूतियाँ।', te: 'సృష్టి అంతటా వ్యాపించిన కృష్ణుని అనంత విభూతులు.' } },
  { id: 11, sanskrit: 'विश्वरूपदर्शनयोगः', transliteration: 'Viśvarūpa Darśana Yoga', titleEn: 'The Vision of the Universal Form', titleTe: 'విశ్వరూప దర్శన యోగం', verses: 55,
    theme: { en: "Arjuna beholds Krishna's cosmic, all-encompassing form.", hi: 'अर्जुन द्वारा कृष्ण के विराट विश्वरूप का दर्शन।', te: 'కృష్ణుని విశ్వరూప దర్శనం అర్జునుడికి లభించడం.' } },
  { id: 12, sanskrit: 'भक्तियोगः', transliteration: 'Bhakti Yoga', titleEn: 'The Yoga of Devotion', titleTe: 'భక్తి యోగం', verses: 20,
    theme: { en: 'The path of loving devotion to the Divine.', hi: 'ईश्वर के प्रति प्रेमपूर्ण भक्ति का मार्ग।', te: 'దేవుని పట్ల ప్రేమపూర్వక భక్తి మార్గం.' } },
  { id: 13, sanskrit: 'क्षेत्रक्षेत्रज्ञविभागयोगः', transliteration: 'Kṣetra Kṣetrajña Vibhāga Yoga', titleEn: 'The Field and its Knower', titleTe: 'క్షేత్ర క్షేత్రజ్ఞ విభాగ యోగం', verses: 34,
    theme: { en: 'Distinguishing the body, the field of action, from the eternal knower within.', hi: 'शरीर रूपी क्षेत्र और उसके भीतर के शाश्वत ज्ञाता का भेद।', te: 'శరీరమనే క్షేత్రం, దానిలోని శాశ్వత జ్ఞాత మధ్య భేదం.' } },
  { id: 14, sanskrit: 'गुणत्रयविभागयोगः', transliteration: 'Guṇatraya Vibhāga Yoga', titleEn: 'The Three Qualities of Nature', titleTe: 'గుణత్రయ విభాగ యోగం', verses: 27,
    theme: { en: 'The three qualities of nature — goodness, passion and inertia — and rising above them.', hi: 'प्रकृति के तीन गुण — सत्व, रज, तम — और उनसे ऊपर उठने का मार्ग।', te: 'ప్రకృతి త్రిగుణాలు — సత్వ, రజ, తమ — వాటిని మించి ఎదగడం.' } },
  { id: 15, sanskrit: 'पुरुषोत्तमयोगः', transliteration: 'Puruṣottama Yoga', titleEn: 'The Supreme Person', titleTe: 'పురుషోత్తమ యోగం', verses: 20,
    theme: { en: 'The Supreme Person beyond the perishable and the imperishable.', hi: 'नश्वर और अविनाशी से परे परम पुरुष का वर्णन।', te: 'నశ్వర, అవినాశీలకు అతీతమైన పురుషోత్తముని వర్ణన.' } },
  { id: 16, sanskrit: 'दैवासुरसम्पद्विभागयोगः', transliteration: 'Daivāsura Sampad Vibhāga Yoga', titleEn: 'The Divine and Demoniac Natures', titleTe: 'దైవాసుర సంపద్విభాగ యోగం', verses: 24,
    theme: { en: 'Contrasting divine and demoniac tendencies within human nature.', hi: 'मानव स्वभाव में दैवी और आसुरी प्रवृत्तियों का अंतर।', te: 'మానవ స్వభావంలో దైవిక, ఆసురిక ప్రవృత్తుల వ్యత్యాసం.' } },
  { id: 17, sanskrit: 'श्रद्धात्रयविभागयोगः', transliteration: 'Śraddhātraya Vibhāga Yoga', titleEn: 'The Threefold Faith', titleTe: 'శ్రద్ధాత్రయ విభాగ యోగం', verses: 28,
    theme: { en: "The threefold nature of faith, shaped by one's inherent qualities.", hi: 'श्रद्धा के तीन रूप, जो व्यक्ति के स्वभाव से निर्धारित होते हैं।', te: 'వ్యక్తి స్వభావాన్ని బట్టి ఏర్పడే శ్రద్ధ యొక్క మూడు రూపాలు.' } },
  { id: 18, sanskrit: 'मोक्षसंन्यासयोगः', transliteration: 'Mokṣa Sanyāsa Yoga', titleEn: 'Liberation through Renunciation', titleTe: 'మోక్ష సన్యాస యోగం', verses: 78,
    theme: { en: 'The culmination — liberation through knowledge, renunciation and surrender.', hi: 'समापन — ज्ञान, संन्यास और समर्पण के माध्यम से मोक्ष।', te: 'ముగింపు — జ్ఞానం, సన్యాసం, శరణాగతి ద్వారా మోక్షం.' } },
]
export const totalVerses = chapters.reduce((sum, chapter) => sum + chapter.verses, 0)
export function getChapter(id: number) { return chapters.find(chapter => chapter.id === id) }

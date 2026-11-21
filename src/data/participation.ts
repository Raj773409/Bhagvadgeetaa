export type ParticipationType = 'individual' | 'group'
export type RegistrationFormState = {
  fullName: string
  email: string
  phoneCountryCode: string
  phone: string
  country: string
  city: string
  preferredLanguage: string
  type: ParticipationType
  groupSize: string
  eventSlug: string
  recitationLanguage: string
  assistance: string
  privacyConsent: boolean
  termsConsent: boolean
}
export const emptyRegistration: RegistrationFormState = {
  fullName: '', email: '', phoneCountryCode: '+91', phone: '', country: '', city: '', preferredLanguage: '',
  type: 'individual', groupSize: '', eventSlug: '', recitationLanguage: '', assistance: '',
  privacyConsent: false, termsConsent: false,
}
export const donationPresets = [500, 1000, 2500, 5000]

export type PartnerApplicationState = {
  orgName: string; contactPerson: string; email: string; phone: string; country: string
  interest: string; message: string; consent: boolean
}
export const emptyPartnerApplication: PartnerApplicationState = {
  orgName: '', contactPerson: '', email: '', phone: '', country: '', interest: '', message: '', consent: false,
}
export type VolunteerApplicationState = {
  name: string; email: string; phone: string; country: string
  skills: string; availability: string; preferredFunction: string; consent: boolean
}
export const emptyVolunteerApplication: VolunteerApplicationState = {
  name: '', email: '', phone: '', country: '', skills: '', availability: '', preferredFunction: '', consent: false,
}

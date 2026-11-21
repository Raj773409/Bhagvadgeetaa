/**
 * Phase 04 integration contract — documentation only, nothing here executes.
 *
 * This project is a static Vite + React frontend with no server runtime, database, payment
 * gateway or email provider connected. None of the types below are wired to a real backend;
 * they exist so a real backend (Phase 05 and beyond) can be built against a stable, reviewed
 * shape instead of guessing one later. Every form in this app that would normally write to
 * one of these tables currently stops short of persistence and tells the user so explicitly
 * (see IntegrationPendingNotice) rather than faking a success state.
 *
 * To make any of Module 01–08 actually function in production, this site needs, at minimum:
 *   - A real database (e.g. Postgres via Supabase/Neon) with migrations for the tables below.
 *   - A real auth provider (e.g. Supabase Auth, Clerk, Auth0) — session cookies, not localStorage flags.
 *   - A real payment gateway (e.g. Razorpay for INR) with server-side order creation + signature/webhook verification.
 *   - A real transactional email provider (e.g. Resend, SES) for confirmations and status emails.
 *   - A server runtime (API routes / Edge Functions) to hold all of the above secrets — never the client bundle.
 */

export type ISODateTime = string

export interface UserRecord { id: string; email: string; createdAt: ISODateTime; lastLoginAt?: ISODateTime }
export interface ParticipantProfile {
  userId: string; fullName: string; phone: string; country: string; city: string
  preferredLanguage: string; updatedAt: ISODateTime
}
export type RegistrationStatus = 'draft' | 'submitted' | 'pending_review' | 'approved' | 'waitlisted' | 'rejected' | 'cancelled' | 'checked_in'
export interface RegistrationRecord {
  id: string; reference: string; userId: string; type: 'individual' | 'group'
  eventId: string; recitationLanguage: string; assistance?: string
  status: RegistrationStatus; createdAt: ISODateTime; updatedAt: ISODateTime
}
export interface RegistrationAttendee { id: string; registrationId: string; fullName: string; notes?: string }
export interface EventRecord { id: string; slug: string; titleKey: string; dateISO: string; status: 'upcoming' | 'completed' | 'cancelled' }
export interface ParticipationRequirement { id: string; eventId: string; label: string; required: boolean }
export interface ParticipantConsent { id: string; userId: string; kind: 'privacy' | 'terms' | 'communications'; acceptedAt: ISODateTime }

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded'
export interface DonationRecord { id: string; userId?: string; amountMinor: number; currency: 'INR'; createdAt: ISODateTime }
export interface PaymentTransaction {
  id: string; donationId: string; provider: 'razorpay'; providerOrderId: string
  status: PaymentStatus; idempotencyKey: string; createdAt: ISODateTime
}
export interface PaymentWebhookEvent { id: string; providerEventId: string; receivedAt: ISODateTime; processedAt?: ISODateTime; verified: boolean }
export interface ReceiptRecord { id: string; donationId: string; number: string; issuedAt: ISODateTime; pdfUrl?: string }

export interface EventPass {
  id: string; registrationId: string; signedToken: string; issuedAt: ISODateTime
  revoked: boolean; revokedAt?: ISODateTime
}
export interface EventCheckin { id: string; passId: string; verifierUserId: string; checkedInAt: ISODateTime; duplicate: boolean }

export interface PartnerApplicationRecord {
  id: string; reference: string; orgName: string; contactPerson: string; email: string; phone: string; country: string
  interest: string; message: string; status: 'submitted' | 'in_review' | 'approved' | 'declined'; createdAt: ISODateTime
}
export interface VolunteerApplicationRecord {
  id: string; reference: string; name: string; email: string; phone: string; country: string
  skills: string; availability: string; preferredFunction: string
  status: 'submitted' | 'in_review' | 'approved' | 'declined'; createdAt: ISODateTime
}

export interface NotificationRecord { id: string; userId: string; title: string; body: string; readAt?: ISODateTime; createdAt: ISODateTime }
export interface NotificationDelivery { id: string; notificationId: string; channel: 'email' | 'in_app'; deliveredAt?: ISODateTime; error?: string }
export interface SupportRequest { id: string; userId?: string; email: string; subject: string; message: string; status: 'open' | 'resolved'; createdAt: ISODateTime }
export interface AuditLogEntry { id: string; actorId: string; action: string; entity: string; entityId: string; at: ISODateTime }

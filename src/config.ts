/**
 * Phase 06 feature flags. Both are false/null because this is a static frontend with no
 * server to hold a Gemini API key or verify an official broadcast — see
 * src/data/backendSchema.ts for what a real deployment needs. Never flip these without an
 * actual server-side AI endpoint or an actual authorised stream URL behind them.
 */
export const AI_BACKEND_CONNECTED = false
export const OFFICIAL_LIVESTREAM_URL: string | null = null

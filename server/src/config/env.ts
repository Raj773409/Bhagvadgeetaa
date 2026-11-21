import 'dotenv/config'

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:8000',

  db: {
    host: required('DB_HOST'),
    port: Number(process.env.DB_PORT ?? 3306),
    database: required('DB_NAME'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    sslMode: process.env.DB_SSL_MODE ?? 'DISABLED',
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
  },
  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN ?? '2h',
  },
  sessionCookieName: process.env.SESSION_COOKIE_NAME ?? 'bgvm_session',

  /** Empty string means "not configured" — callers must show an honest
   * integration-required state, never pretend these calls succeeded. */
  integrations: {
    paymentGatewayKeyId: process.env.PAYMENT_GATEWAY_KEY_ID ?? '',
    paymentGatewayKeySecret: process.env.PAYMENT_GATEWAY_KEY_SECRET ?? '',
    emailProviderApiKey: process.env.EMAIL_PROVIDER_API_KEY ?? '',
    geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  },
}

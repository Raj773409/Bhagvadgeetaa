import mysql from 'mysql2/promise'
import { env } from '../config/env.js'

/** The one connection pool for the whole server. Every query goes through
 * parameterized statements via this pool — never string-concatenated SQL. */
export const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.database,
  user: env.db.user,
  password: env.db.password,
  waitForConnections: true,
  connectionLimit: env.db.connectionLimit,
  queueLimit: 0,
  namedPlaceholders: true,
  dateStrings: false,
  ssl: env.db.sslMode === 'DISABLED' ? undefined : { rejectUnauthorized: true },
})

export async function checkDatabaseHealth(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
  const start = Date.now()
  try {
    const connection = await pool.getConnection()
    try { await connection.query('SELECT 1') } finally { connection.release() }
    return { ok: true, latencyMs: Date.now() - start }
  } catch (error) {
    return { ok: false, latencyMs: Date.now() - start, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

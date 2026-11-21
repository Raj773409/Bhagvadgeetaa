import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'
import { env } from '../config/env.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const migrationsDir = join(__dirname, '..', '..', 'migrations')

async function connect() {
  return mysql.createConnection({
    host: env.db.host, port: env.db.port, database: env.db.database,
    user: env.db.user, password: env.db.password, multipleStatements: true,
  })
}

async function ensureMigrationsTable(connection: mysql.Connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `)
}

function listMigrationFiles(): string[] {
  return readdirSync(migrationsDir)
    .filter(name => name.endsWith('.sql') && !name.endsWith('.down.sql'))
    .sort()
}

async function appliedFilenames(connection: mysql.Connection): Promise<Set<string>> {
  const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT filename FROM schema_migrations')
  return new Set(rows.map(row => row.filename as string))
}

async function up() {
  const connection = await connect()
  try {
    await ensureMigrationsTable(connection)
    const applied = await appliedFilenames(connection)
    const files = listMigrationFiles()
    let ranCount = 0
    for (const file of files) {
      if (applied.has(file)) continue
      const sql = readFileSync(join(migrationsDir, file), 'utf8')
      console.log(`Applying migration: ${file}`)
      await connection.query(sql)
      await connection.query('INSERT INTO schema_migrations (filename) VALUES (?)', [file])
      ranCount++
    }
    console.log(ranCount === 0 ? 'No pending migrations — database is up to date.' : `Applied ${ranCount} migration(s).`)
  } finally {
    await connection.end()
  }
}

async function status() {
  const connection = await connect()
  try {
    await ensureMigrationsTable(connection)
    const applied = await appliedFilenames(connection)
    const files = listMigrationFiles()
    for (const file of files) console.log(`${applied.has(file) ? '[applied]' : '[pending]'} ${file}`)
  } finally {
    await connection.end()
  }
}

async function down() {
  const connection = await connect()
  try {
    await ensureMigrationsTable(connection)
    const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT filename FROM schema_migrations ORDER BY id DESC LIMIT 1')
    if (rows.length === 0) { console.log('No migrations to roll back.'); return }
    const last = rows[0].filename as string
    const downFile = last.replace(/\.sql$/, '.down.sql')
    try {
      const sql = readFileSync(join(migrationsDir, downFile), 'utf8')
      console.log(`Rolling back: ${downFile}`)
      await connection.query(sql)
      await connection.query('DELETE FROM schema_migrations WHERE filename = ?', [last])
      console.log('Rollback complete.')
    } catch {
      console.log(`No rollback script found for ${last} (expected ${downFile}). Nothing was changed.`)
    }
  } finally {
    await connection.end()
  }
}

const command = process.argv[2]
if (command === 'up') await up()
else if (command === 'status') await status()
else if (command === 'down') await down()
else { console.error('Usage: migrate.ts <up|status|down>'); process.exit(1) }

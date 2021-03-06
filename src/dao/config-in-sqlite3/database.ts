import Database from 'better-sqlite3'
import type { Database as IDatabase } from 'better-sqlite3'
import * as path from 'path'
import { ensureDirSync } from 'extra-filesystem'
import { DATA } from '@env'
import { assert } from '@blackglory/errors'
import { migrateDatabase } from './utils'

let db: IDatabase

export function openDatabase(): void {
  const dataPath = DATA()
  const dataFilename = path.join(dataPath, 'config.db')
  ensureDirSync(dataPath)

  db = new Database(dataFilename)
}

export async function prepareDatabase(): Promise<void> {
  assert(db, 'Database is not opened')
  await migrateDatabase(db)
}

export function getDatabase(): IDatabase {
  assert(db, 'Database is not opened')
  return db
}

export function closeDatabase(): void {
  if (db) {
    db.exec(`
      PRAGMA analysis_limit=400;
      PRAGMA optimize;
    `)
    db.close()
  }
}

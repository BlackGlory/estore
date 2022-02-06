import * as ConfigInSqlite3 from '@dao/config-in-sqlite3/database'
import * as DataInSqlite3 from '@dao/data-in-sqlite3/database'
import { resetCache } from '@env/cache'
import { buildServer } from '@src/server'

let server: ReturnType<typeof buildServer>
let address: string

export function getAddress() {
  return address
}

export async function startService() {
  await initializeDatabases()
  server = buildServer()
  address = await server.listen(0)
}

export async function stopService() {
  server.metrics.clearRegister()
  await server.close()
  clearDatabases()
  resetEnvironment()
}

export async function initializeDatabases() {
  ConfigInSqlite3.openDatabase()
  await ConfigInSqlite3.prepareDatabase()

  DataInSqlite3.openDatabase()
  await DataInSqlite3.prepareDatabase()
}

export async function clearDatabases() {
  ConfigInSqlite3.closeDatabase()
  DataInSqlite3.closeDatabase()
}

export async function resetEnvironment() {
  // assigning a property on `process.env` will implicitly convert the value to a string.
  // use `delete` to delete a property from `process.env`.
  // see also: https://nodejs.org/api/process.html#process_process_env
  delete process.env.ESTORE_ADMIN_PASSWORD
  delete process.env.ESTORE_LIST_BASED_ACCESS_CONTROL
  delete process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL
  delete process.env.ESTORE_WRITE_TOKEN_REQUIRED
  delete process.env.ESTORE_READ_TOKEN_REQUIRED
  delete process.env.ESTORE_DELETE_TOKEN_REQUIRED
  delete process.env.ESTORE_JSON_VALIDATION
  delete process.env.ESTORE_DEFAULT_JSON_SCHEMA

  // reset memoize
  resetCache()
}

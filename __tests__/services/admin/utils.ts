import { assert } from '@blackglory/prelude'

export function createAuthHeaders(adminPassword?: string) {
  const value = adminPassword ?? process.env.ESTORE_ADMIN_PASSWORD
  assert(value, 'value should not be undefined')

  return {
    'Authorization': `Bearer ${value}`
  }
}

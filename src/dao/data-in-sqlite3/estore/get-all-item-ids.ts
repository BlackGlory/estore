import { getDatabase } from '../database'
import { map } from 'iterable-operator'

export function getAllItemIds(namespace: string): Iterable<string> {
  const iter = getDatabase().prepare(`
    SELECT DISTINCT item_id
      FROM estore_event
     WHERE namespace = $namespace;
  `).iterate({ namespace })

  return map(iter, row => row['item_id'])
}

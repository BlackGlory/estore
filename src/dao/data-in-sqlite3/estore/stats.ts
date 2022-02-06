import { getDatabase } from '../database'

export function stats(namespace: string): IStats {
  const row = getDatabase().prepare(`
    SELECT COUNT(DISTINCT item_id) AS items
      FROM estore_event
     WHERE namespace = $namespace
  `).get({ namespace })

  return {
    namespace: namespace
  , items: row['items']
  }
}

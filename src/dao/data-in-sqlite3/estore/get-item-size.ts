import { getDatabase } from '../database'

export function getItemSize(namespace: string, itemId: string): number {
  const row = getDatabase().prepare(`
    SELECT "index"
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" DESC
  `).get({ namespace, itemId })
  if (!row) return 0

  return row['index'] + 1
}

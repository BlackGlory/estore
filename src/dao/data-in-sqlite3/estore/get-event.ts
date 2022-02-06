import { getDatabase } from '../database'

export function getEvent(namespace: string, itemId: string, index: number): string | null {
  const row = getDatabase().prepare(`
    SELECT payload
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
       AND "index" = $index
  `).get({ namespace, itemId, index })
  if (!row) return null

  return row['payload']
}

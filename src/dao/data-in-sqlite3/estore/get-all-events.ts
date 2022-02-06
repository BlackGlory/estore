import { getDatabase } from '../database'

export function getAllEvents(namespace: string, itemId: string): string[] | null {
  const rows = getDatabase().prepare(`
    SELECT payload
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" ASC
  `).all({ namespace, itemId })
  if (!rows.length) return null

  return rows.map(row => row['payload'])
}

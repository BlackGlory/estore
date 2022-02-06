import { getDatabase } from '../database'

export function hasItem(namespace: string, itemId: string): boolean {
  const row = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT 1
               FROM estore_event
              WHERE namespace = $namespace
                AND item_id = $itemId
           ) AS matched;
  `).get({ namespace, itemId })

  return row['matched'] === 1
}

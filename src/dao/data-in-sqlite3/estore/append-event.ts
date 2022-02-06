import { IllegalIndex } from './error'
import { getDatabase } from '../database'
import { isntUndefined } from '@blackglory/types'

export function appendEvent(
  namespace: string
, itemId: string
, payload: string
, index?: number
): void {
  getDatabase().transaction(() => {
    const nextIndex = getNextIndex(namespace, itemId)
    if (isntUndefined(index)) {
      if (index !== nextIndex) throw new IllegalIndex(namespace, itemId)
    }

    getDatabase().prepare(`
      INSERT INTO estore_event (namespace, item_id, "index", payload)
      VALUES ($namespace, $itemId, $index, $payload)
    `).run({
      namespace
    , itemId
    , index: nextIndex
    , payload
    })
  })()
}

function getNextIndex(namespace: string, itemId: string): number {
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

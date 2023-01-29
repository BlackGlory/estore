import { getDatabase } from '@dao/data-in-sqlite3/database.js'

interface IRawItem {
  namespace: string
  itemId: string
  index: number
  payload: string
}

export function setRawEvent(event: IRawItem): IRawItem {
  getDatabase().prepare(`
    INSERT INTO estore_event (
      namespace
    , item_id
    , "index"
    , payload
    )
    VALUES (
      $namespace
    , $itemId
    , $index
    , $payload
    );
  `).run(event)

  return event
}

export function hasRawEvent(namespace: string, itemId: string, index: number): boolean {
  return !!getRawEvent(namespace, itemId, index)
}

export function getRawEvent(namespace: string, itemId: string, index: number): IRawItem | undefined {
  return getDatabase().prepare(`
    SELECT *
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
       AND "index" = $index;
  `).get({ namespace, itemId, index })
}

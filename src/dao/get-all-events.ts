import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'
import { JSONValue } from '@blackglory/prelude'

export const getAllEvents = withLazyStatic((
  namespace: string
, itemId: string
): JSONValue[] => {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT event
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" ASC
  `), [getDatabase()])
    .all({ namespace, itemId }) as Array<{ event: string }>

  return rows.map(row => JSON.parse(row['event']) as JSONValue)
})

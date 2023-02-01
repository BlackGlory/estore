import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllEvents = withLazyStatic(function (
  namespace: string
, itemId: string
): string[] | null {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT payload
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" ASC
  `), [getDatabase()]).all({ namespace, itemId })
  if (!rows.length) return null

  return rows.map(row => row['payload'])
})

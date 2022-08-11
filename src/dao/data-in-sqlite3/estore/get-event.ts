import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getEvent = withLazyStatic(function (
  namespace: string
, itemId: string
, index: number
): string | null {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT payload
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
       AND "index" = $index
  `), [getDatabase()]).get({ namespace, itemId, index })
  if (!row) return null

  return row['payload']
})

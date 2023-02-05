import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getEvent = withLazyStatic((
  namespace: string
, itemId: string
, eventIndex: number
): string | null => {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT event
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
       AND "index" = $index
  `), [getDatabase()])
    .get({
      namespace
    , itemId
    , index: eventIndex
    }) as { event: string } | undefined
  if (!row) return null

  return row['event']
})

import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getNextEventIndex = withLazyStatic((
  namespace: string
, itemId: string
): number => {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT "index"
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" DESC 
  `), [getDatabase()])
    .get({ namespace, itemId }) as { index: number } | undefined
  if (!row) return 0

  return row['index'] + 1
})

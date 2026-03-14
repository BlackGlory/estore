import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getLastEventIndex = withLazyStatic((
  namespace: string
, itemId: string
): number | null => {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT "index"
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" DESC
  `), [getDatabase()])
    .get({ namespace, itemId }) as { index: number } | undefined
  if (!row) return null

  return row['index']
})

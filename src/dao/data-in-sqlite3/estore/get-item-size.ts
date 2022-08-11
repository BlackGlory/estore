import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getItemSize = withLazyStatic(function (
  namespace: string
, itemId: string
): number {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT "index"
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" DESC
  `), [getDatabase()]).get({ namespace, itemId })
  if (!row) return 0

  return row['index'] + 1
})

import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const stats = withLazyStatic(function (namespace: string): IStats {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT COUNT(DISTINCT item_id) AS items
      FROM estore_event
     WHERE namespace = $namespace
  `), [getDatabase()]).get({ namespace })

  return {
    namespace: namespace
  , items: row['items']
  }
})

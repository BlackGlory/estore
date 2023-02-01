import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const hasItem = withLazyStatic((namespace: string, itemId: string): boolean => {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT EXISTS(
             SELECT 1
               FROM estore_event
              WHERE namespace = $namespace
                AND item_id = $itemId
           ) AS matched;
  `), [getDatabase()]).get({ namespace, itemId })

  return row['matched'] === 1
})

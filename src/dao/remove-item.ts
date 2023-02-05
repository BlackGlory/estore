import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeItem = withLazyStatic((namespace: string, itemId: string): void => {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId;
  `), [getDatabase()]).run({ namespace, itemId })
})

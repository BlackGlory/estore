import { getDatabase } from '../database.js'
import { map } from 'iterable-operator'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllItemIds = withLazyStatic(function (namespace: string): Iterable<string> {
  const iter = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT item_id
      FROM estore_event
     WHERE namespace = $namespace;
  `), [getDatabase()]).iterate({ namespace })

  return map(iter, row => row['item_id'])
})

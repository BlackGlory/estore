import { hasItem } from './has-item.js'
import { NotFound } from './error.js'
import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

/**
 * @throws {NotFound}
 */
export const deleteItem = withLazyStatic(function (
  namespace: string
, id: string
): void {
  lazyStatic(() => getDatabase().transaction((namespace: string, id: string) => {
    if (!hasItem(namespace, id)) throw new NotFound(namespace, id)

    del(namespace, id)
  }), [getDatabase()])(namespace, id)
})

const del = withLazyStatic(function (namespace: string, itemId: string): void {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId;
  `), [getDatabase()]).run({ namespace, itemId })
})

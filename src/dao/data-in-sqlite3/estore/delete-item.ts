import { hasItem } from './has-item'
import { NotFound } from './error'
import { getDatabase } from '../database'

/**
 * @throws {NotFound}
 */
export function deleteItem(namespace: string, id: string): void {
  getDatabase().transaction(() => {
    if (!hasItem(namespace, id)) throw new NotFound(namespace, id)

    del(namespace, id)
  })()
}

function del(namespace: string, itemId: string): void {
  getDatabase().prepare(`
    DELETE FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId;
  `).run({ namespace, itemId })
}

import { getDatabase } from '../database'

export function clearItems(namespace: string): void {
  getDatabase().prepare(`
    DELETE FROM estore_event
     WHERE namespace = $namespace;
  `).run({ namespace })
}

import { getDatabase } from '../database'
import { map } from 'iterable-operator'

export function getAllNamespaces(): Iterable<string> {
  const iter = getDatabase().prepare(`
    SELECT DISTINCT namespace
      FROM estore_event;
  `).iterate()

  return map(iter, row => row['namespace'])
}

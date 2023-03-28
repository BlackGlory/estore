import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'
import { INamespaceStats } from '@src/contract.js'

export const getNamespaceStats = withLazyStatic((
  namespace: string
): INamespaceStats => {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT COUNT(DISTINCT item_id) AS items
      FROM estore_event
     WHERE namespace = $namespace
  `), [getDatabase()])
    .get({ namespace }) as { items: number }

  return {
    items: row['items']
  }
})

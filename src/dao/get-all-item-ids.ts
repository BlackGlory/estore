import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllItemIds = withLazyStatic((namespace: string): string[] => {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT item_id
      FROM estore_event
     WHERE namespace = $namespace;
  `), [getDatabase()])
    .all({ namespace }) as Array<{ item_id: string }>

  return rows.map(row => row['item_id'])
})

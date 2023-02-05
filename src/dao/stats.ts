import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'
import { IStats } from '@src/contract.js'

export const stats = withLazyStatic((namespace: string): IStats => {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT COUNT(DISTINCT item_id) AS items
      FROM estore_event
     WHERE namespace = $namespace
  `), [getDatabase()])
    .get({ namespace }) as { items: number }

  return {
    namespace: namespace
  , items: row['items']
  }
})

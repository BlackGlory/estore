import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllNamespaces = withLazyStatic((): string[] => {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT namespace
      FROM estore_event;
  `), [getDatabase()])
    .all() as Array<{ namespace: string }>

  return rows.map(row => row['namespace'])
})

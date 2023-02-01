import { IllegalIndex } from './error.js'
import { getDatabase } from '../database.js'
import { isntUndefined } from 'extra-utils'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const appendEvent = withLazyStatic(function (
  namespace: string
, itemId: string
, payload: string
, index?: number
): void {
  lazyStatic(() => getDatabase().transaction((
    namespace: string
  , itemId: string
  , payload: string
  , index?: number
  ) => {
    const nextIndex = getNextIndex(namespace, itemId)
    if (isntUndefined(index)) {
      if (index !== nextIndex) throw new IllegalIndex(namespace, itemId)
    }

    lazyStatic(() => getDatabase().prepare(`
      INSERT INTO estore_event (namespace, item_id, "index", payload)
      VALUES ($namespace, $itemId, $index, $payload)
    `), [getDatabase()]).run({
      namespace
    , itemId
    , index: nextIndex
    , payload
    })
  }), [getDatabase()])(
    namespace
  , itemId
  , payload
  , index
  )
})

const getNextIndex = withLazyStatic(function (
  namespace: string
, itemId: string
): number {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT "index"
      FROM estore_event
     WHERE namespace = $namespace
       AND item_id = $itemId
     ORDER BY "index" DESC 
  `), [getDatabase()])
    .get({ namespace, itemId }) as { index: number } | undefined
  if (!row) return 0

  return row['index'] + 1
})

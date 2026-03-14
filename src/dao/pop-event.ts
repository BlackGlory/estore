import { EventIndexConflict } from '@src/contract.js'
import { getDatabase } from '@src/database.js'
import { isntUndefined } from 'extra-utils'
import { withLazyStatic, lazyStatic } from 'extra-lazy'
import { getLastEventIndex } from './get-last-event-index.js'

/**
 * @throws {EventIndexConflict}
 */
export const popEvent = withLazyStatic((
  namespace: string
, itemId: string
, expectedLastEventIndex?: number
): void => {
  lazyStatic(() => getDatabase().transaction((
    namespace: string
  , itemId: string
  , expectedLastEventIndex?: number
  ) => {
    const actualLastEventIndex = getLastEventIndex(namespace, itemId)
    if (isntUndefined(expectedLastEventIndex)) {
      if (expectedLastEventIndex !== actualLastEventIndex) {
        throw new EventIndexConflict()
      }
    }

    lazyStatic(() => getDatabase().prepare(`
      DELETE FROM estore_event
       WHERE namespace = $namespace
         AND item_id = $itemId
         AND "index" = $index
    `), [getDatabase()]).run({
      namespace
    , itemId
    , index: actualLastEventIndex
    })
  }), [getDatabase()])(
    namespace
  , itemId
  , expectedLastEventIndex
  )
})

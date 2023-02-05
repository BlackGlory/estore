import { EventIndexConflict } from '@src/errors.js'
import { getDatabase } from '../database.js'
import { isntUndefined } from 'extra-utils'
import { withLazyStatic, lazyStatic } from 'extra-lazy'
import { getNextEventIndex } from './get-next-event-index.js'

export const appendEvent = withLazyStatic((
  namespace: string
, itemId: string
, event: string
, expectedNextEventIndex?: number
): void => {
  lazyStatic(() => getDatabase().transaction((
    namespace: string
  , itemId: string
  , event: string
  , expectedNextEventIndex?: number
  ) => {
    const actualNextEventIndex = getNextEventIndex(namespace, itemId)
    if (isntUndefined(expectedNextEventIndex)) {
      if (expectedNextEventIndex !== actualNextEventIndex) {
        throw new EventIndexConflict()
      }
    }

    lazyStatic(() => getDatabase().prepare(`
      INSERT INTO estore_event (namespace, item_id, "index", event)
      VALUES ($namespace, $itemId, $index, $event)
    `), [getDatabase()]).run({
      namespace
    , itemId
    , index: actualNextEventIndex
    , event
    })
  }), [getDatabase()])(
    namespace
  , itemId
  , event
  , expectedNextEventIndex
  )
})

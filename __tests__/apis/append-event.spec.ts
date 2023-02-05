import { EventIndexConflict } from '@src/errors.js'
import { startService, stopService, buildClient } from '@test/utils.js'
import { getRawEvent, setRawEvent } from './utils.js'
import { getErrorAsync } from 'return-style'

beforeEach(startService)
afterEach(stopService)

describe('appendEvent', () => {
  describe('no index', () => {
    test('item does not exist', async () => {
      const client = await buildClient()
      const namespace = 'test'
      const itemId = 'id'
      const event = 'event'

      await client.appendEvent(namespace, itemId, event)

      expect(getRawEvent(namespace, itemId, 0)).toEqual({
        namespace
      , item_id: itemId
      , index: 0
      , event
      })
    })

    test('item exists', async () => {
      const client = await buildClient()
      const namespace = 'test'
      const itemId = 'id'
      const event = 'event-2'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , event: 'event-1'
      })

      await client.appendEvent(namespace, itemId, event)

      expect(getRawEvent(namespace, itemId, 1)).toEqual({
        namespace
      , item_id: itemId
      , index: 1
      , event
      })
    })
  })

  test('legal index', async () => {
    const client = await buildClient()
    const namespace = 'test'
    const itemId = 'id'
    const event = 'event'

    await client.appendEvent(namespace, itemId, event, 0)

    expect(getRawEvent(namespace, itemId, 0)).toEqual({
      namespace
    , item_id: itemId
    , index: 0
    , event
    })
  })

  test('illegal index', async () => {
    const client = await buildClient()
    const namespace = 'test'
    const itemId = 'id'
    const event = 'event'

    const err = await getErrorAsync(() => client.appendEvent(namespace, itemId, event, 1))

    expect(err).toBeInstanceOf(EventIndexConflict)
  })
})

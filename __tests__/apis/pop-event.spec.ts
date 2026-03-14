import { EventIndexConflict } from '@src/contract.js'
import { startService, stopService, buildClient } from '@test/utils.js'
import { getRawEvent, setRawEvent } from './utils.js'
import { getErrorAsync } from 'return-style'

beforeEach(startService)
afterEach(stopService)

describe('popEvent', () => {
  describe('without last index', () => {
    test('item does not exist', async () => {
      const client = await buildClient()
      const namespace = 'test'
      const itemId = 'id'

      await client.popEvent(namespace, itemId)

      expect(getRawEvent(namespace, itemId, 0)).toBeUndefined()
    })

    test('item exists', async () => {
      const client = await buildClient()
      const namespace = 'test'
      const itemId = 'id'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , event: JSON.stringify('event-1')
      })
      setRawEvent({
        namespace
      , itemId
      , index: 1
      , event: JSON.stringify('event-2')
      })

      await client.popEvent(namespace, itemId)

      expect(getRawEvent(namespace, itemId, 0)).toEqual({
        namespace
      , item_id: itemId
      , index: 0
      , event: JSON.stringify('event-1')
      })
      expect(getRawEvent(namespace, itemId, 1)).toBeUndefined()
    })
  })

  describe('with last index', () => {
    test('legal index', async () => {
      const client = await buildClient()
      const namespace = 'test'
      const itemId = 'id'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , event: JSON.stringify('event')
      })

      await client.popEvent(namespace, itemId, 0)

      expect(getRawEvent(namespace, itemId, 0)).toBeUndefined()
    })

    test('illegal index', async () => {
      const client = await buildClient()
      const namespace = 'test'
      const itemId = 'id'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , event: JSON.stringify('event')
      })

      const err = await getErrorAsync(() => client.popEvent(namespace, itemId, 1))

      expect(err).toBeInstanceOf(EventIndexConflict)
      expect(getRawEvent(namespace, itemId, 0)).toEqual({
        namespace
      , item_id: itemId
      , index: 0
      , event: JSON.stringify('event')
      })
    })
  })
})

import { startService, stopService, buildClient } from '@test/utils.js'
import { setRawEvent } from './utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getAllEvents', () => {
  test('empty', async () => {
    const client = await buildClient()
    const namespace = 'test'
    setRawEvent({
      namespace
    , itemId: 'id-2'
    , index: 0
    , event: JSON.stringify('event')
    })

    const result = await client.getAllEvents(namespace, 'id-1')

    expect(result).toStrictEqual([])
  })

  describe('not empty', () => {
    it('returns events order by index asc', async () => {
      const client = await buildClient()
      const namespace = 'test'
      setRawEvent({
        namespace
      , itemId: 'id-1'
      , index: 0
      , event: JSON.stringify('event-1')
      })
      setRawEvent({
        namespace
      , itemId: 'id-1'
      , index: 1
      , event: JSON.stringify('event-2')
      })
      setRawEvent({
        namespace
      , itemId: 'id-2'
      , index: 0
      , event: JSON.stringify('event-3')
      })

      const result = await client.getAllEvents(namespace, 'id-1')

      expect(result).toEqual(['event-1', 'event-2'])
    })
  })
})

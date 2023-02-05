import { startService, stopService, buildClient } from '@test/utils.js'
import { setRawEvent } from './utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getEvent', () => {
  test('event exists', async () => {
    const client = await buildClient()
    const namespace = 'test'
    const itemId = 'id-1'
    const index = 0
    const event = 'event'
    setRawEvent({
      namespace
    , itemId
    , index
    , event
    })

    const result = await client.getEvent(namespace, itemId, index)

    expect(result).toStrictEqual(event)
  })

  test('event does not exist', async () => {
    const client = await buildClient()
    const namespace = 'test'
    const itemId = 'id-1'
    const index = 0

    const result = await client.getEvent(namespace, itemId, index)

    expect(result).toBeNull()
  })
})

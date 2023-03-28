import { startService, stopService, buildClient } from '@test/utils.js'
import { hasRawEvent, setRawEvent } from './utils.js'

beforeEach(startService)
afterEach(stopService)

describe('removeItem', () => {
  test('item exists', async () => {
    const client = await buildClient()
    const namespace = 'test'
    const itemId = 'id'
    setRawEvent({
      namespace
    , itemId
    , index: 0
    , event: JSON.stringify('event')
    })

    await client.removeItem(namespace, itemId)

    expect(hasRawEvent(namespace, itemId, 0)).toBe(false)
  })

  test('item does not exist', async () => {
    const client = await buildClient()
    const namespace = 'test'
    const id = 'id'

    await client.removeItem(namespace, id)

    expect(hasRawEvent(namespace, id, 0)).toBe(false)
  })
})

import { startService, stopService, buildClient } from '@test/utils.js'
import { hasRawEvent, setRawEvent } from './utils.js'

beforeEach(startService)
afterEach(stopService)

describe('clearItemsByNamespace', () => {
  test('empty', async () => {
    const client = await buildClient()
    const namesapce1 = 'namespace-1'
    const namesapce2 = 'namespace-2'
    const itemId = 'item-id'
    setRawEvent({
      namespace: namesapce2
    , itemId
    , index: 0
    , event: JSON.stringify('event')
    })

    await client.clearItemsByNamespace(namesapce1)

    expect(hasRawEvent(namesapce2, itemId, 0)).toBe(true)
  })

  test('not empty', async () => {
    const client = await buildClient()
    const namesapce1 = 'namespace-1'
    const namesapce2 = 'namespace-2'
    const itemId = 'item-id'
    setRawEvent({
      namespace: namesapce1
    , itemId
    , index: 0
    , event: 'event'
    })
    setRawEvent({
      namespace: namesapce2
    , itemId
    , index: 0
    , event: JSON.stringify('event')
    })

    await client.clearItemsByNamespace(namesapce1)

    expect(hasRawEvent(namesapce1, itemId, 0)).toBe(false)
    expect(hasRawEvent(namesapce2, itemId, 0)).toBe(true)
  })
})

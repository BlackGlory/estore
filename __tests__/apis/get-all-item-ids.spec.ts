import { setRawEvent } from './utils.js'
import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getAllItemIds', () => {
  test('empty', async () => {
    const client = await buildClient()
    const namespace = 'namespace'

    const result = await client.getAllItemIds(namespace)

    expect(result).toStrictEqual([])
  })

  test('not empty', async () => {
    const client = await buildClient()
    const namespace = 'namespace'
    const itemId1 = 'item-1'
    const itemId2 = 'item-2'
    setRawEvent({
      namespace
    , itemId: itemId1
    , index: 0
    , event: JSON.stringify('event-1')
    })
    setRawEvent({
      namespace
    , itemId: itemId2
    , index: 0
    , event: JSON.stringify('event-2')
    })

    const result = await client.getAllItemIds(namespace)

    expect(result).toStrictEqual([itemId1, itemId2])
  })
})

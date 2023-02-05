import { stats } from '@dao/stats.js'
import { setRawEvent } from './utils.js'
import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('stats', () => {
  test('empty', async () => {
    const client = await buildClient()
    const namespace = 'namespace'

    const result = await client.stats(namespace)

    expect(result).toEqual({
      namespace
    , items: 0
    })
  })

  test('not empty', async () => {
    const client = await buildClient()
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    setRawEvent({
      namespace: namespace1
    , itemId: 'item-1'
    , index: 0
    , event: 'event-1'
    })
    setRawEvent({
      namespace: namespace1
    , itemId: 'item-2'
    , index: 0
    , event: 'event-2'
    })
    setRawEvent({
      namespace: namespace2
    , itemId: 'item-1'
    , index: 0
    , event: 'event-1'
    })

    const result = await client.stats(namespace1)

    expect(result).toEqual({
      namespace: namespace1
    , items: 2
    })
  })
})

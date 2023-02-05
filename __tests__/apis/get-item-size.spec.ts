import { startService, stopService, buildClient } from '@test/utils.js'
import { setRawEvent } from './utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getItemSize', () => {
  test('empty', async () => {
    const client = await buildClient()
    const namespace = 'test'
    setRawEvent({
      namespace
    , itemId: 'id-2'
    , index: 0
    , event: 'event'
    })

    const result = await client.getItemSize(namespace, 'id-1')

    expect(result).toBe(0)
  })

  test('not empty', async () => {
    const client = await buildClient()
    const namespace = 'namespace'
    setRawEvent({
      namespace
    , itemId: 'id-1'
    , index: 0
    , event: 'event'
    })
    setRawEvent({
      namespace
    , itemId: 'id-2'
    , index: 0
    , event: 'event'
    })

    const result = await client.getItemSize(namespace, 'id-1')

    expect(result).toBe(1)
  })
})

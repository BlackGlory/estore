import { setRawEvent } from './utils.js'
import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getAllNamespaces', () => {
  test('empty', async () => {
    const client = await buildClient()

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual([])
  })

  test('not empty', async () => {
    const client = await buildClient()
    const namespace = 'namespace'
    const itemId = 'item-1'
    setRawEvent({
      namespace
    , itemId
    , index: 0
    , event: JSON.stringify('event')
    })

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual([namespace])
  })
})

import { EStoreDAO } from '@dao/estore/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { getRawEvent, setRawEvent } from './utils.js'
import { getError } from 'return-style'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('appendEvent', () => {
  describe('no index', () => {
    test('item does not exist', () => {
      const namespace = 'test'
      const itemId = 'id'
      const payload = 'payload'

      const result = EStoreDAO.appendEvent(namespace, itemId, payload)

      expect(result).toBeUndefined()
      expect(getRawEvent(namespace, itemId, 0)).toEqual({
        namespace
      , item_id: itemId
      , index: 0
      , payload
      })
    })

    test('item exists', () => {
      const namespace = 'test'
      const itemId = 'id'
      const payload = 'payload-2'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , payload: 'payload-1'
      })

      const result = EStoreDAO.appendEvent(namespace, itemId, payload)

      expect(result).toBeUndefined()
      expect(getRawEvent(namespace, itemId, 1)).toEqual({
        namespace
      , item_id: itemId
      , index: 1
      , payload
      })
    })
  })

  test('legal index', () => {
    const namespace = 'test'
    const itemId = 'id'
    const payload = 'payload'

    const result = EStoreDAO.appendEvent(namespace, itemId, payload, 0)

    expect(result).toBeUndefined()
    expect(getRawEvent(namespace, itemId, 0)).toEqual({
      namespace
    , item_id: itemId
    , index: 0
    , payload
    })
  })

  test('illegal index', () => {
    const namespace = 'test'
    const itemId = 'id'
    const payload = 'payload'

    const err = getError(() => EStoreDAO.appendEvent(namespace, itemId, payload, 1))

    expect(err).toBeInstanceOf(EStoreDAO.IllegalIndex)
  })
})

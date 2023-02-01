import { EStoreDAO } from '@dao/data/estore/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawEvent, setRawEvent } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('clearItems(namespace: string): void', () => {
  describe('empty', () => {
    it('return undefined', () => {
      const namesapce1 = 'namespace-1'
      const namesapce2 = 'namespace-2'
      const itemId = 'item-id'
      setRawEvent({
        namespace: namesapce2
      , itemId
      , index: 0
      , payload: 'payload'
      })

      const result = EStoreDAO.clearItems(namesapce1)

      expect(result).toBeUndefined()
      expect(hasRawEvent(namesapce2, itemId, 0)).toBe(true)
    })
  })

  describe('not empty', () => {
    it('return undefined', () => {
      const namesapce1 = 'namespace-1'
      const namesapce2 = 'namespace-2'
      const itemId = 'item-id'
      setRawEvent({
        namespace: namesapce1
      , itemId
      , index: 0
      , payload: 'payload'
      })
      setRawEvent({
        namespace: namesapce2
      , itemId
      , index: 0
      , payload: 'payload'
      })

      const result = EStoreDAO.clearItems(namesapce1)

      expect(result).toBeUndefined()
      expect(hasRawEvent(namesapce1, itemId, 0)).toBe(false)
      expect(hasRawEvent(namesapce2, itemId, 0)).toBe(true)
    })
  })
})

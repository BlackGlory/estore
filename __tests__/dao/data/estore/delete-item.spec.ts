import { EStoreDAO } from '@dao/data/estore/index.js'
import { getError } from 'return-style'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawEvent, setRawEvent } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('deleteItem(namespace: string, id: string): void', () => {
  describe('it exists', () => {
    it('return undefined', () => {
      const namespace = 'test'
      const itemId = 'id'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , payload: 'payload'
      })

      const result = EStoreDAO.deleteItem(namespace, itemId)

      expect(result).toBeUndefined()
      expect(hasRawEvent(namespace, itemId, 0)).toBe(false)
    })
  })

  describe('it does not exist', () => {
    it('throw NotFound', () => {
      const namespace = 'test'
      const id = 'id'

      const err = getError(() => EStoreDAO.deleteItem(namespace, id))

      expect(err).toBeInstanceOf(EStoreDAO.NotFound)
      expect(hasRawEvent(namespace, id, 0)).toBe(false)
    })
  })
})

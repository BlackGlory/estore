import { EStoreDAO } from '@dao/data/estore/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawEvent } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getEvent(namespace: string, itemId: string, index: number): string | null', () => {
  describe('it exists', () => {
    it('return payload', () => {
      const namespace = 'test'
      const itemId = 'id-1'
      const index = 0
      const payload = 'payload'
      setRawEvent({
        namespace
      , itemId
      , index
      , payload
      })

      const result = EStoreDAO.getEvent(namespace, itemId, index)

      expect(result).toStrictEqual(payload)
    })
  })

  describe('it does not exist', () => {
    it('return null', () => {
      const namespace = 'test'
      const itemId = 'id-1'
      const index = 0

      const result = EStoreDAO.getEvent(namespace, itemId, index)

      expect(result).toBeNull()
    })
  })
})

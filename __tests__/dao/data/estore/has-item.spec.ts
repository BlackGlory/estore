import { EStoreDAO } from '@dao/data/estore/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawEvent } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('hasItem(namespace: string, itemId: string): boolean', () => {
  describe('it exists', () => {
    it('return true', () => {
      const namespace = 'test'
      const itemId = 'id-1'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , payload: 'payload'
      })

      const result = EStoreDAO.hasItem(namespace, itemId)

      expect(result).toBe(true)
    })
  })

  describe('it does not exist', () => {
    it('return false', () => {
      const namespace = 'test'
      const itemId = 'id-1'

      const result = EStoreDAO.hasItem(namespace, itemId)

      expect(result).toBe(false)
    })
  })
})

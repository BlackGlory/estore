import * as DAO from '@dao/data-in-sqlite3/estore/get-event.js'
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

      const result = DAO.getEvent(namespace, itemId, index)

      expect(result).toStrictEqual(payload)
    })
  })

  describe('it does not exist', () => {
    it('return null', () => {
      const namespace = 'test'
      const itemId = 'id-1'
      const index = 0

      const result = DAO.getEvent(namespace, itemId, index)

      expect(result).toBeNull()
    })
  })
})

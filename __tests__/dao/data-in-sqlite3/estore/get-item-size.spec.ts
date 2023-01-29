import * as DAO from '@dao/data-in-sqlite3/estore/get-item-size.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawEvent } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getItemSize(namespace: string, itemId: string): number', () => {
  describe('empty', () => {
    it('return 0', () => {
      const namespace = 'test'
      setRawEvent({
        namespace
      , itemId: 'id-2'
      , index: 0
      , payload: 'payload'
      })

      const result = DAO.getItemSize(namespace, 'id-1')

      expect(result).toBe(0)
    })
  })

  describe('not empty', () => {
    it('return number', () => {
      const namespace = 'namespace'
      setRawEvent({
        namespace
      , itemId: 'id-1'
      , index: 0
      , payload: 'payload'
      })
      setRawEvent({
        namespace
      , itemId: 'id-2'
      , index: 0
      , payload: 'payload'
      })

      const result = DAO.getItemSize(namespace, 'id-1')

      expect(result).toBe(1)
    })
  })
})

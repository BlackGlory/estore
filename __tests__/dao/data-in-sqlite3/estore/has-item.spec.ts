import * as DAO from '@dao/data-in-sqlite3/estore/has-item'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { setRawEvent } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

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

      const result = DAO.hasItem(namespace, itemId)

      expect(result).toBeTrue()
    })
  })

  describe('it does not exist', () => {
    it('return false', () => {
      const namespace = 'test'
      const itemId = 'id-1'

      const result = DAO.hasItem(namespace, itemId)

      expect(result).toBeFalse()
    })
  })
})

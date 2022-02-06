import * as DAO from '@dao/data-in-sqlite3/estore/delete-item'
import { NotFound } from '@dao/data-in-sqlite3/estore/error'
import { getError } from 'return-style'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { hasRawEvent, setRawEvent } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

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

      const result = DAO.deleteItem(namespace, itemId)

      expect(result).toBeUndefined()
      expect(hasRawEvent(namespace, itemId, 0)).toBeFalse()
    })
  })

  describe('it does not exist', () => {
    it('throw NotFound', () => {
      const namespace = 'test'
      const id = 'id'

      const err = getError(() => DAO.deleteItem(namespace, id))

      expect(err).toBeInstanceOf(NotFound)
      expect(hasRawEvent(namespace, id, 0)).toBeFalse()
    })
  })
})

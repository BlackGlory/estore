import * as DAO from '@dao/data-in-sqlite3/estore/get-all-namespaces'
import { toArray } from 'iterable-operator'
import { setRawEvent } from './utils'
import { initializeDatabases, clearDatabases } from '@test/utils'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllNamespaces(): Iterable<string>', () => {
  describe('empty', () => {
    it('return Iterable<string>', () => {
      const iter = DAO.getAllNamespaces()
      const result = toArray(iter)

      expect(result).toStrictEqual([])
    })
  })

  describe('not empty', () => {
    it('return Iterable<string>', () => {
      const namespace = 'namespace-'
      const itemId = 'item-1'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , payload: 'payload'
      })

      const iter = DAO.getAllNamespaces()
      const result = toArray(iter)

      expect(result).toStrictEqual([namespace])
    })
  })
})

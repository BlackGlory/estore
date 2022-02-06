import * as DAO from '@dao/data-in-sqlite3/estore/stats'
import { setRawEvent } from './utils'
import { initializeDatabases, clearDatabases } from '@test/utils'
import '@blackglory/jest-matchers'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('stats(): IInfo', () => {
  describe('empty', () => {
    it('return IInfo', () => {
      const namespace = 'namespace'

      const result = DAO.stats(namespace)

      expect(result).toEqual({
        namespace
      , items: 0
      })
    })
  })

  describe('not empty', () => {
    it('return IInfo', () => {
      const namespace1 = 'namespace-1'
      const namespace2 = 'namespace-2'
      setRawEvent({
        namespace: namespace1
      , itemId: 'item-1'
      , index: 0
      , payload: 'payload-1'
      })
      setRawEvent({
        namespace: namespace1
      , itemId: 'item-2'
      , index: 0
      , payload: 'payload-2'
      })
      setRawEvent({
        namespace: namespace2
      , itemId: 'item-1'
      , index: 0
      , payload: 'payload-1'
      })

      const result = DAO.stats(namespace1)

      expect(result).toEqual({
        namespace: namespace1
      , items: 2
      })
    })
  })
})

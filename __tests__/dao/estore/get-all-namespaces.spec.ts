import { EStoreDAO } from '@dao/estore/index.js'
import { toArray } from 'iterable-operator'
import { setRawEvent } from './utils.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllNamespaces(): Iterable<string>', () => {
  describe('empty', () => {
    it('return Iterable<string>', () => {
      const iter = EStoreDAO.getAllNamespaces()
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

      const iter = EStoreDAO.getAllNamespaces()
      const result = toArray(iter)

      expect(result).toStrictEqual([namespace])
    })
  })
})

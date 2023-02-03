import { EStoreDAO } from '@dao/estore/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawEvent } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllEvents(namespace: string, itemId: string): string[] | null', () => {
  describe('empty', () => {
    it('return null', () => {
      const namespace = 'test'
      setRawEvent({
        namespace
      , itemId: 'id-2'
      , index: 0
      , payload: 'payload'
      })

      const result = EStoreDAO.getAllEvents(namespace, 'id-1')

      expect(result).toBe(null)
    })
  })

  describe('not empty', () => {
    it('return payloads order by index asc', () => {
      const namespace = 'test'
      setRawEvent({
        namespace
      , itemId: 'id-1'
      , index: 0
      , payload: 'payload-1'
      })
      setRawEvent({
        namespace
      , itemId: 'id-1'
      , index: 1
      , payload: 'payload-2'
      })
      setRawEvent({
        namespace
      , itemId: 'id-2'
      , index: 0
      , payload: 'payload-3'
      })

      const result = EStoreDAO.getAllEvents(namespace, 'id-1')

      expect(result).toEqual(['payload-1', 'payload-2'])
    })
  })
})

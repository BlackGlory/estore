import * as DAO from '@dao/data-in-sqlite3/estore/append-event'
import { IllegalIndex } from '@dao/data-in-sqlite3/estore/error'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { getRawEvent, setRawEvent } from './utils'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('appendEvent', () => {
  describe('no index', () => {
    test('item does not exist', () => {
      const namespace = 'test'
      const itemId = 'id'
      const payload = 'payload'

      const result = DAO.appendEvent(namespace, itemId, payload)

      expect(result).toBeUndefined()
      expect(getRawEvent(namespace, itemId, 0)).toEqual({
        namespace
      , item_id: itemId
      , index: 0
      , payload
      })
    })

    test('item exists', () => {
      const namespace = 'test'
      const itemId = 'id'
      const payload = 'payload-2'
      setRawEvent({
        namespace
      , itemId
      , index: 0
      , payload: 'payload-1'
      })

      const result = DAO.appendEvent(namespace, itemId, payload)

      expect(result).toBeUndefined()
      expect(getRawEvent(namespace, itemId, 1)).toEqual({
        namespace
      , item_id: itemId
      , index: 1
      , payload
      })
    })
  })

  test('legal index', () => {
    const namespace = 'test'
    const itemId = 'id'
    const payload = 'payload'

    const result = DAO.appendEvent(namespace, itemId, payload, 0)

    expect(result).toBeUndefined()
    expect(getRawEvent(namespace, itemId, 0)).toEqual({
      namespace
    , item_id: itemId
    , index: 0
    , payload
    })
  })

  test('illegal index', () => {
    const namespace = 'test'
    const itemId = 'id'
    const payload = 'payload'

    const err = getError(() => DAO.appendEvent(namespace, itemId, payload, 1))

    expect(err).toBeInstanceOf(IllegalIndex)
  })
})

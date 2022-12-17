import { startService, stopService, getAddress } from '@test/utils'
import { EStoreDAO } from '@dao'
import { fetch } from 'extra-fetch'
import { post } from 'extra-request'
import { url, pathname, json, header } from 'extra-request/lib/es2018/transformers'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  describe('no index', () => {
    it('204', async () => {
      const namespace = 'namespace'
      const id = 'id'

      const res = await fetch(post(
        url(getAddress())
      , pathname(`/estore/${namespace}/items/${id}/events`)
      , json('event')
      ))

      expect(res.status).toBe(204)
    })
  })

  describe('illegal index', () => {
    it('412', async () => {
      const namespace = 'namespace'
      const id = 'id'
      await EStoreDAO.appendEvent(namespace, id, JSON.stringify('event'), 0)

      const res = await fetch(post(
        url(getAddress())
      , pathname(`/estore/${namespace}/items/${id}/events`)
      , header('If-Match', '0')
      , json('event')
      ))

      expect(res.status).toBe(412)
    })
  })

  describe('legal index', () => {
    it('204', async () => {
      const namespace = 'namespace'
      const id = 'id'
      await EStoreDAO.appendEvent(namespace, id, JSON.stringify('event'), 0)

      const res = await fetch(post(
        url(getAddress())
      , pathname(`/estore/${namespace}/items/${id}/events`)
      , header('If-Match', '1')
      , json('event')
      ))

      expect(res.status).toBe(204)
    })
  })
})

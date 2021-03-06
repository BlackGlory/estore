import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO, EStoreDAO } from '@dao'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname, searchParam } from 'extra-request/lib/es2018/transformers'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('token-based access control', () => {
  describe('enabled', () => {
    describe('namespace need delete tokens', () => {
      describe('token matched', () => {
        it('200', async () => {
          process.env.STORTOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ namespace, token })

          const res = await fetch(get(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events/0`)
          , searchParam('token', token)
          ))

          expect(res.status).toBe(200)
        })
      })

      describe('token does not matched', () => {
        it('401', async () => {
          process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ namespace, token })

          const res = await fetch(get(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events/0`)
          ))

          expect(res.status).toBe(401)
        })
      })

      describe('no token', () => {
        it('401', async () => {
          process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ namespace, token })

          const res = await fetch(get(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events/0`)
          ))

          expect(res.status).toBe(401)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('READ_TOKEN_REQUIRED=true', () => {
        it('401', async () => {
          process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          process.env.ESTORE_READ_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))

          const res = await fetch(get(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events/0`)
          ))

          expect(res.status).toBe(401)
        })
      })

      describe('READ_TOKEN_REQUIRED=false', () => {
        it('200', async () => {
          process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))

          const res = await fetch(get(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events/0`)
          ))

          expect(res.status).toBe(200)
        })
      })
    })
  })

  describe('disabled', () => {
    describe('namespace need delete tokens', () => {
      describe('no token', () => {
        it('200', async () => {
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ namespace, token })

          const res = await fetch(get(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events/0`)
          ))

          expect(res.status).toBe(200)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('READ_TOKEN_REQUIRED=true', () => {
        it('200', async () => {
          process.env.ESTORE_READ_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ namespace, token })

          const res = await fetch(get(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events/0`)
          ))

          expect(res.status).toBe(200)
        })
      })
    })
  })
})

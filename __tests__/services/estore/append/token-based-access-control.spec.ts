import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao'
import { fetch } from 'extra-fetch'
import { post } from 'extra-request'
import { url, pathname, json, searchParam } from 'extra-request/lib/es2018/transformers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('token-based access control', () => {
  describe('enabled', () => {
    describe('namespace need delete tokens', () => {
      describe('token matched', () => {
        it('204', async () => {
          process.env.STORTOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const payload = 'document'
          await AccessControlDAO.setWriteTokenRequired(namespace, true)
          await AccessControlDAO.setWriteToken({ namespace, token })

          const res = await fetch(post(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events`)
          , searchParam('token', token)
          , json(payload)
          ))

          expect(res.status).toBe(204)
        })
      })

      describe('token does not matched', () => {
        it('401', async () => {
          process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const payload = 'document'
          await AccessControlDAO.setWriteTokenRequired(namespace, true)
          await AccessControlDAO.setWriteToken({ namespace, token })

          const res = await fetch(post(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events`)
          , json(payload)
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
          const payload = 'document'
          await AccessControlDAO.setWriteTokenRequired(namespace, true)
          await AccessControlDAO.setWriteToken({ namespace, token })

          const res = await fetch(post(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events`)
          , json(payload)
          ))

          expect(res.status).toBe(401)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('WRITE_TOKEN_REQUIRED=true', () => {
        it('401', async () => {
          process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          process.env.ESTORE_WRITE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const payload = 'document'

          const res = await fetch(post(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events`)
          , json(payload)
          ))

          expect(res.status).toBe(401)
        })
      })

      describe('WRITE_TOKEN_REQUIRED=false', () => {
        it('204', async () => {
          process.env.ESTORE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const payload = 'document'

          const res = await fetch(post(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events`)
          , json(payload)
          ))

          expect(res.status).toBe(204)
        })
      })
    })
  })

  describe('disabled', () => {
    describe('namespace need delete tokens', () => {
      describe('no token', () => {
        it('204', async () => {
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const payload = 'document'
          await AccessControlDAO.setWriteTokenRequired(namespace, true)
          await AccessControlDAO.setWriteToken({ namespace, token })

          const res = await fetch(post(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events`)
          , json(payload)
          ))

          expect(res.status).toBe(204)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('WRITE_TOKEN_REQUIRED=true', () => {
        it('204', async () => {
          process.env.ESTORE_WRITE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const payload = 'document'
          await AccessControlDAO.setWriteTokenRequired(namespace, true)
          await AccessControlDAO.setWriteToken({ namespace, token })

          const res = await fetch(post(
            url(getAddress())
          , pathname(`/estore/${namespace}/items/${id}/events`)
          , json(payload)
          ))

          expect(res.status).toBe(204)
        })
      })
    })
  })
})

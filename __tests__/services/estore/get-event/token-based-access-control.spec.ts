import { startService, stopService, getAddress } from '@test/utils.js'
import { AccessControlDAO, EStoreDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname, searchParam } from 'extra-request/transformers'

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
          EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          AccessControlDAO.TokenPolicy.setReadTokenRequired(namespace, true)
          AccessControlDAO.Token.setReadToken({ namespace, token })

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
          EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          AccessControlDAO.TokenPolicy.setReadTokenRequired(namespace, true)
          AccessControlDAO.Token.setReadToken({ namespace, token })

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
          EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          AccessControlDAO.TokenPolicy.setReadTokenRequired(namespace, true)
          AccessControlDAO.Token.setReadToken({ namespace, token })

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
          EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          AccessControlDAO.TokenPolicy.setReadTokenRequired(namespace, true)
          AccessControlDAO.Token.setReadToken({ namespace, token })

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
          EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))
          AccessControlDAO.TokenPolicy.setReadTokenRequired(namespace, true)
          AccessControlDAO.Token.setReadToken({ namespace, token })

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

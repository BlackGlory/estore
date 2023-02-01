import { startService, stopService, getAddress } from '@test/utils.js'
import { AccessControlDAO, EStoreDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { head } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

describe('whitelist', () => {
  describe('enabled', () => {
    describe('namespace in whitelist', () => {
      it('204', async () => {
        process.env.ESTORE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const id = 'id'
        EStoreDAO.appendEvent(namespace, id, 'payload')
        AccessControlDAO.Whitelist.addWhitelistItem(namespace)

        const res = await fetch(head(
          url(getAddress())
        , pathname(`/estore/${namespace}/items/${id}`)
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('namespace not in whitelist', () => {
      it('403', async () => {
        process.env.ESTORE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const id = 'id'
        EStoreDAO.appendEvent(namespace, id, 'payload')

        const res = await fetch(head(
          url(getAddress())
        , pathname(`/estore/${namespace}/items/${id}`)
        ))

        expect(res.status).toBe(403)
      })
    })
  })

  describe('disabled', () => {
    describe('namespace not in whitelist', () => {
      it('204', async () => {
        const namespace = 'namespace'
        const id = 'id'
        EStoreDAO.appendEvent(namespace, id, 'payload')

        const res = await fetch(head(
          url(getAddress())
        , pathname(`/estore/${namespace}/items/${id}`)
        ))

        expect(res.status).toBe(204)
      })
    })
  })
})

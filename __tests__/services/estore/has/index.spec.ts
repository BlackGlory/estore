import { startService, stopService, getAddress } from '@test/utils.js'
import { EStoreDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { head } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
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

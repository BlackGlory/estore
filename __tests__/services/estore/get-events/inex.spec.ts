import { startService, stopService, getAddress } from '@test/utils.js'
import { EStoreDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('200', async () => {
    const namespace = 'namespace'
    const id = 'id'
    await EStoreDAO.appendEvent(namespace, id, JSON.stringify('payload'))

    const res = await fetch(get(
      url(getAddress())
    , pathname(`/estore/${namespace}/items/${id}/events`)
    ))

    expect(res.status).toBe(200)
  })
})

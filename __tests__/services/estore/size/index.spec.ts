import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { EStoreDAO } from '@dao'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/lib/es2018/transformers'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('200', async () => {
    const namespace = 'namespace'
    const id = 'id'
    await EStoreDAO.appendEvent(namespace, id, 'payload')

    const res = await fetch(get(
      url(getAddress())
    , pathname(`/estore/${namespace}/items/${id}/size`)
    ))

    expect(res.status).toBe(200)
  })
})

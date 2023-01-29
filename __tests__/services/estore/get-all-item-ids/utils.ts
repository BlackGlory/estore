import { EStoreDAO } from '@dao/index.js'

export async function prepareItems(namespace: string, itemNamespaces: string[]) {
  for (const id of itemNamespaces) {
    await EStoreDAO.appendEvent(namespace, id, 'payload')
  }
}

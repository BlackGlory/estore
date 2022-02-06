import { EStoreDAO } from '@dao'

export async function prepareItems(namespace: string, itemNamespaces: string[]) {
  for (const id of itemNamespaces) {
    await EStoreDAO.appendEvent(namespace, id, 'payload')
  }
}

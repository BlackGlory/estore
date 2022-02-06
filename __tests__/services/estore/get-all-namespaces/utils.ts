import { EStoreDAO } from '@dao'

export async function prepareEStores(namespaces: string[]) {
  for (const namespace of namespaces) {
    await EStoreDAO.appendEvent(namespace, 'id', 'payload')
  }
}

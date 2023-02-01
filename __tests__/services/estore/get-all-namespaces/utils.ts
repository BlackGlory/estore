import { EStoreDAO } from '@dao/index.js'

export function prepareEStores(namespaces: string[]): void {
  for (const namespace of namespaces) {
    EStoreDAO.appendEvent(namespace, 'id', 'payload')
  }
}

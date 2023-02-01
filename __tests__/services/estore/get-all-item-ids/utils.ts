import { EStoreDAO } from '@dao/index.js'

export function prepareItems(namespace: string, itemNamespaces: string[]): void {
  for (const id of itemNamespaces) {
    EStoreDAO.appendEvent(namespace, id, 'payload')
  }
}

import { removeItem as _removeItem } from '@dao/remove-item.js'

export function removeItem(namespace: string, itemId: string): null {
  _removeItem(namespace, itemId)
  return null
}

import { getItemSize as _getItemSize } from '@dao/get-item-size.js'

export function getItemSize(namespace: string, itemId: string): number {
  return _getItemSize(namespace, itemId)
}

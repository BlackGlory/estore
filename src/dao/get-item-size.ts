import { getLastEventIndex } from './get-last-event-index.js'
import { isNull } from '@blackglory/prelude'

export function getItemSize(namespace: string, itemId: string): number {
  const lastEventIndex = getLastEventIndex(namespace, itemId)
  return isNull(lastEventIndex)
       ? 0
       : lastEventIndex + 1
}

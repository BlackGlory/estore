import { JSONValue } from '@blackglory/prelude'
import { getEvent as _getEvent } from '@dao/get-event.js'

export function getEvent(
  namespace: string
, itemId: string
, eventIndex: number
): JSONValue | null {
  return _getEvent(namespace, itemId, eventIndex)
}

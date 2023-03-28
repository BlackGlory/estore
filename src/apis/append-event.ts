import { appendEvent as _appendEvent } from '@dao/append-event.js'
import { JSONValue } from '@blackglory/prelude'

export function appendEvent(
  namespace: string
, itemId: string
, event: JSONValue
, nextEventIndex?: number
): null {
  _appendEvent(namespace, itemId, event, nextEventIndex)
  return null
}

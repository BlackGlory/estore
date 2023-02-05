import { appendEvent as _appendEvent } from '@dao/append-event.js'

export function appendEvent(
  namespace: string
, itemId: string
, event: string
, nextEventIndex?: number
): null {
  _appendEvent(namespace, itemId, event, nextEventIndex)
  return null
}

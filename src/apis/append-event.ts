import { appendEvent as _appendEvent } from '@dao/append-event.js'
import { JSONValue } from '@blackglory/prelude'
import { isntAbortSignal } from 'extra-abort'

export function appendEvent(
  namespace: string
, itemId: string
, event: JSONValue
, nextEventIndex: number
, signal?: AbortSignal
): null
export function appendEvent(
  namespace: string
, itemId: string
, event: JSONValue
, signal?: AbortSignal
): null
export function appendEvent(...args:
| [
    namespace: string
  , itemId: string
  , event: JSONValue
  , nextEventIndex: number
  , signal?: AbortSignal
  ]
| [
    namespace: string
  , itemId: string
  , event: JSONValue
  , signal?: AbortSignal
  ]
): null {
  const [namespace, itemId, event, nextEventIndexOrSignal] = args
  const nextEventIndex = isntAbortSignal(nextEventIndexOrSignal)
                       ? nextEventIndexOrSignal
                       : undefined

  _appendEvent(namespace, itemId, event, nextEventIndex)
  return null
}

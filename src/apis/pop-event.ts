import { popEvent as _popEvent } from '@dao/pop-event.js'
import { isntAbortSignal } from 'extra-abort'

export function popEvent(
  namespace: string
, itemId: string
, lastEventIndex: number
, signal?: AbortSignal
): null
export function popEvent(
  namespace: string
, itemId: string
, signal?: AbortSignal
): null
export function popEvent(...args:
| [
    namespace: string
  , itemId: string
  , lastEventIndex: number
  , signal?: AbortSignal
  ]
| [
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ]
): null {
  const [namespace, itemId, lastEventIndexOrSignal] = args
  const lastEventIndex = isntAbortSignal(lastEventIndexOrSignal)
                       ? lastEventIndexOrSignal
                       : undefined

  _popEvent(namespace, itemId, lastEventIndex)
  return null
}

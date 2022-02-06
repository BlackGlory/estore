import { NotFound, IllegalIndex } from './error'
import { appendEvent } from './append-event'
import { hasItem } from './has-item'
import { getEvent } from './get-event'
import { getAllEvents } from './get-all-events'
import { deleteItem } from './delete-item'
import { clearItems } from './clear-items'
import { getAllItemIds } from './get-all-item-ids'
import { getAllNamespaces } from './get-all-namespaces'
import { getItemSize } from './get-item-size'
import { stats } from './stats'

export const EStoreDAO: IEStoreDAO = {
  hasItem: asyncify(hasItem)
, getItemSize: asyncify(getItemSize)

, appendEvent: asyncify(appendEvent)

, getEvent: asyncify(getEvent)
, getAllEvents: asyncify(getAllEvents)

, deleteItem: asyncify(deleteItem)

, clearItems: asyncify(clearItems)
, stats: asyncify(stats)

, getAllItemIds: asyncifyIterable(getAllItemIds)
, getAllNamespaces: asyncifyIterable(getAllNamespaces)

, NotFound
, IllegalIndex
}

function asyncify<T extends any[], U>(fn: (...args: T) => U): (...args: T) => Promise<U> {
  return async function (this: unknown, ...args: T): Promise<U> {
    return Reflect.apply(fn, this, args)
  }
}

function asyncifyIterable<T extends any[], U>(fn: (...args: T) => Iterable<U>): (...args: T) => AsyncIterable<U> {
  return async function* (this: unknown, ...args: T): AsyncIterable<U> {
    yield* Reflect.apply(fn, this, args)
  }
}

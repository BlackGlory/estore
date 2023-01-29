import { NotFound, IllegalIndex } from './error.js'
import { appendEvent } from './append-event.js'
import { hasItem } from './has-item.js'
import { getEvent } from './get-event.js'
import { getAllEvents } from './get-all-events.js'
import { deleteItem } from './delete-item.js'
import { clearItems } from './clear-items.js'
import { getAllItemIds } from './get-all-item-ids.js'
import { getAllNamespaces } from './get-all-namespaces.js'
import { getItemSize } from './get-item-size.js'
import { stats } from './stats.js'

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

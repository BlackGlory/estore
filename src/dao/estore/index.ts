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
import { IEStoreDAO } from './contract.js'

export const EStoreDAO: IEStoreDAO = {
  hasItem
, getItemSize

, appendEvent

, getEvent
, getAllEvents

, deleteItem

, clearItems
, stats

, getAllItemIds
, getAllNamespaces

, NotFound
, IllegalIndex
}

import { ImplementationOf } from 'delight-rpc'
import { IAPI } from '@src/contract.js'
import { appendEvent } from './append-event.js'
import { clearItemsByNamespace } from './clear-items-by-namespace.js'
import { removeItem } from './remove-item.js'
import { getAllEvents } from './get-all-events.js'
import { getAllItemIds } from './get-all-item-ids.js'
import { getAllNamespaces } from './get-all-namespaces.js'
import { getEvent } from './get-event.js'
import { getItemSize } from './get-item-size.js'
import { getNamespaceStats } from './get-namespace-stats.js'

export const API: ImplementationOf<IAPI> = {
  getAllNamespaces
, getAllItemIds
, getAllEvents
, getNamespaceStats
, clearItemsByNamespace
, removeItem
, getItemSize
, appendEvent: appendEvent as ImplementationOf<IAPI>['appendEvent']
, getEvent
}

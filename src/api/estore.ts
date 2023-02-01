import { EStoreDAO } from '@dao/index.js'
import { JSONValue } from '@blackglory/prelude'
import { isNull } from 'extra-utils'
import { IStats } from './contract.js'

export function has(namespace: string, id: string): boolean {
  return EStoreDAO.hasItem(namespace, id)
}

export function size(namespace: string, id: string): number {
  return EStoreDAO.getItemSize(namespace, id)
}

export function getEvent(
  namespace: string
, id: string
, index: number
): JSONValue | undefined {
  const result = EStoreDAO.getEvent(namespace, id, index)
  if (isNull(result)) {
    return undefined
  } else {
    return JSON.parse(result)
  }
}

export function getAllEvents(namespace: string, id: string): JSONValue[] | undefined {
  const result = EStoreDAO.getAllEvents(namespace, id)
  if (isNull(result)) {
    return undefined
  } else {
    return result.map(x => JSON.parse(x))
  }
}

export function stats(namespace: string): IStats {
  return EStoreDAO.stats(namespace)
}

export function clear(namespace: string): void {
  return EStoreDAO.clearItems(namespace)
}

/**
 * @throws {IllegalIndex}
 */
export function append(
  namespace: string
, id: string
, payload: JSONValue
, index?: number
): void {
  try {
    return EStoreDAO.appendEvent(namespace, id, JSON.stringify(payload), index)
  } catch (e) {
    if (e instanceof EStoreDAO.IllegalIndex) throw new IllegalIndex(namespace, id)
    throw e
  }
}

/**
 * @throws {NotFound}
 */
export function del(namespace: string, id: string): void {
  try {
    return EStoreDAO.deleteItem(namespace, id)
  } catch (e) {
    if (e instanceof EStoreDAO.NotFound) throw new NotFound(namespace, id)
    throw e
  }
}

export function getAllItemIds(namespace: string): Iterable<string> {
  return EStoreDAO.getAllItemIds(namespace)
}

export function getAllNamespaces(): Iterable<string> {
  return EStoreDAO.getAllNamespaces()
}

export class IllegalIndex extends EStoreDAO.IllegalIndex {}
export class NotFound extends EStoreDAO.NotFound {}

import { EStoreDAO } from '@dao/index.js'
import { JSONValue } from '@blackglory/prelude'
import { isNull } from 'extra-utils'

export function has(namespace: string, id: string): Promise<boolean> {
  return EStoreDAO.hasItem(namespace, id)
}

export function size(namespace: string, id: string): Promise<number> {
  return EStoreDAO.getItemSize(namespace, id)
}

export async function getEvent(
  namespace: string
, id: string
, index: number
): Promise<JSONValue | undefined> {
  const result = await EStoreDAO.getEvent(namespace, id, index)
  if (isNull(result)) {
    return undefined
  } else {
    return JSON.parse(result)
  }
}

export async function getAllEvents(
  namespace: string
, id: string
): Promise<JSONValue[] | undefined> {
  const result = await EStoreDAO.getAllEvents(namespace, id)
  if (isNull(result)) {
    return undefined
  } else {
    return result.map(x => JSON.parse(x))
  }
}

export async function stats(namespace: string): Promise<IStats> {
  return EStoreDAO.stats(namespace)
}

export async function clear(namespace: string): Promise<void> {
  return EStoreDAO.clearItems(namespace)
}

/**
 * @throws {IllegalIndex}
 */
export async function append(namespace: string, id: string, payload: JSONValue, index?: number): Promise<void> {
  try {
    return await EStoreDAO.appendEvent(namespace, id, JSON.stringify(payload), index)
  } catch (e) {
    if (e instanceof EStoreDAO.IllegalIndex) throw new IllegalIndex(namespace, id)
    throw e
  }
}

/**
 * @throws {NotFound}
 */
export async function del(namespace: string, id: string): Promise<void> {
  try {
    return await EStoreDAO.deleteItem(namespace, id)
  } catch (e) {
    if (e instanceof EStoreDAO.NotFound) throw new NotFound(namespace, id)
    throw e
  }
}

export function getAllItemIds(namespace: string): AsyncIterable<string> {
  return EStoreDAO.getAllItemIds(namespace)
}

export function getAllNamespaces(): AsyncIterable<string> {
  return EStoreDAO.getAllNamespaces()
}

export class IllegalIndex extends EStoreDAO.IllegalIndex {}
export class NotFound extends EStoreDAO.NotFound {}

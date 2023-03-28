import { JSONValue } from '@blackglory/prelude'
import { getAllEvents as _getAllEvents } from '@dao/get-all-events.js'

export function getAllEvents(namespace: string, id: string): JSONValue[] {
  return _getAllEvents(namespace, id)
}

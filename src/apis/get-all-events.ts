import { getAllEvents as _getAllEvents } from '@dao/get-all-events.js'

export function getAllEvents(namespace: string, id: string): string[] {
  return _getAllEvents(namespace, id)
}

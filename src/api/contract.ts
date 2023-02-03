import { JSONValue } from '@blackglory/prelude'
import { CustomError } from '@blackglory/errors'

export interface IStats {
  namespace: string
  items: number
}

export interface IAPI {
  isAdmin(password: string): boolean

  EStore: {
    has(namespace: string, id: string): boolean
    size(namespace: string, id: string): number
    getEvent(
      namespace: string
    , id: string
    , index: number
    ): JSONValue | undefined
    getAllEvents(namespace: string, id: string): JSONValue[] | undefined
    getAllItemIds(namespace: string): Iterable<string>
    getAllNamespaces(): Iterable<string>
    clear(namespace: string): void
    stats(namespace: string): IStats

    /**
     * @throws {IllegalIndex}
     */
    append(
      namespace: string
    , id: string
    , payload: JSONValue
    , index?: number
    ): void

    /**
     * @throws {NotFound}
     */
    del(namespace: string, id: string): void

    NotFound: new (namespace: string, id: string) => CustomError
    IllegalIndex: new (namespace: string, id: string) => CustomError
  }
}

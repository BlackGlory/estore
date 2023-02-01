import { JSONValue } from '@blackglory/prelude'
import { CustomError, CustomErrorConstructor } from '@blackglory/errors'

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

  Blacklist: {
    isEnabled(): boolean
    isBlocked(namespace: string): boolean
    getAll(): string[]
    add(namespace: string): void
    remove(namespace: string): void

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): void
    Forbidden: CustomErrorConstructor
  }

  Whitelist: {
    isEnabled(): boolean
    isBlocked(namespace: string): boolean
    getAll(): string[]
    add(namespace: string): void
    remove(namespace: string): void

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): void
    Forbidden: CustomErrorConstructor
  }

  JSONSchema: {
    isEnabled(): boolean
    getAllNamespaces(): string[]
    get(namespace: string): string | null
    set(namespace: string, schema: JSONValue): void
    remove(namespace: string): void

    /**
     * @throws {InvalidPayload}
     */
    validate(namespace: string, payload: JSONValue): void
    InvalidPayload: CustomErrorConstructor
  }

  TBAC: {
    isEnabled(): boolean

    /**
     * @throws {Unauthorized}
     */
    checkWritePermission(namespace: string, token?: string): void

    /**
     * @throws {Unauthorized}
     */
    checkReadPermission(namespace: string, token?: string): void

    /**
     * @throws {Unauthorized}
     */
    checkDeletePermission(namespace: string, token?: string): void

    Unauthorized: CustomErrorConstructor

    Token: {
      getAllNamespaces(): string[]
      getAll(namespace: string): Array<{
        token: string
        write: boolean
        read: boolean
        delete: boolean
      }>

      setWriteToken(namespace: string, token: string): void
      unsetWriteToken(namespace: string, token: string): void

      setReadToken(namespace: string, token: string): void
      unsetReadToken(namespace: string, token: string): void

      setDeleteToken(namespace: string, token: string): void
      unsetDeleteToken(namespace: string, token: string): void
    }

    TokenPolicy: {
      getAllNamespaces(): string[]
      get(namespace: string): {
        writeTokenRequired: boolean | null
        readTokenRequired: boolean | null
      }

      setWriteTokenRequired(namespace: string, val: boolean): void
      unsetWriteTokenRequired(namespace: string): void

      setReadTokenRequired(namespace: string, val: boolean): void
      unsetReadTokenRequired(namespace: string): void

      setDeleteTokenRequired(namespace: string, val: boolean): void
      unsetDeleteTokenRequired(namespace: string): void
    }
  }
}

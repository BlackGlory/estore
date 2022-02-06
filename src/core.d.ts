type Json = import('justypes').Json
type CustomErrorConstructor = import('@blackglory/errors').CustomErrorConstructor

interface IStats {
  namespace: string
  items: number
}

interface ICore {
  isAdmin(password: string): boolean

  EStore: {
    has(namespace: string, id: string): Promise<boolean>
    size(namespace: string, id: string): Promise<number>
    getEvent(namespace: string, id: string, index: number): Promise<Json | undefined>
    getAllEvents(namespace: string, id: string): Promise<Json[] | undefined>
    getAllItemIds(namespace: string): AsyncIterable<string>
    getAllNamespaces(): AsyncIterable<string>
    clear(namespace: string): Promise<void>
    stats(namespace: string): Promise<IStats>

    /**
     * @throws {IllegalIndex}
     */
    append(namespace: string, id: string, payload: Json, index?: number): Promise<void>

    /**
     * @throws {NotFound}
     */
    del(namespace: string, id: string): Promise<void>

    NotFound: new (namespace: string, id: string) => CustomError
    IllegalIndex: new (namespace: string, id: string) => CustomError
  }

  Blacklist: {
    isEnabled(): boolean
    isBlocked(namespace: string): Promise<boolean>
    getAll(): Promise<string[]>
    add(namespace: string): Promise<void>
    remove(namespace: string): Promise<void>

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): Promise<void>
    Forbidden: CustomErrorConstructor
  }

  Whitelist: {
    isEnabled(): boolean
    isBlocked(namespace: string): Promise<boolean>
    getAll(): Promise<string[]>
    add(namespace: string): Promise<void>
    remove(namespace: string): Promise<void>

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): Promise<void>
    Forbidden: CustomErrorConstructor
  }

  JsonSchema: {
    isEnabled(): boolean
    getAllNamespaces(): Promise<string[]>
    get(namespace: string): Promise<string | null>
    set(namespace: string, schema: Json): Promise<void>
    remove(namespace: string): Promise<void>

    /**
     * @throws {InvalidPayload}
     */
    validate(namespace: string, payload: Json): Promise<void>
    InvalidPayload: CustomErrorConstructor
  }

  TBAC: {
    isEnabled(): boolean

    /**
     * @throws {Unauthorized}
     */
    checkWritePermission(namespace: string, token?: string): Promise<void>

    /**
     * @throws {Unauthorized}
     */
    checkReadPermission(namespace: string, token?: string): Promise<void>

    /**
     * @throws {Unauthorized}
     */
    checkDeletePermission(namespace: string, token?: string): Promise<void>

    Unauthorized: CustomErrorConstructor

    Token: {
      getAllNamespaces(): Promise<string[]>
      getAll(namespace: string): Promise<Array<{
        token: string
        write: boolean
        read: boolean
        delete: boolean
      }>>

      setWriteToken(namespace: string, token: string): Promise<void>
      unsetWriteToken(namespace: string, token: string): Promise<void>

      setReadToken(namespace: string, token: string): Promise<void>
      unsetReadToken(namespace: string, token: string): Promise<void>

      setDeleteToken(namespace: string, token: string): Promise<void>
      unsetDeleteToken(namespace: string, token: string): Promise<void>
    }

    TokenPolicy: {
      getAllNamespaces(): Promise<string[]>
      get(namespace: string): Promise<{
        writeTokenRequired: boolean | null
        readTokenRequired: boolean | null
      }>

      setWriteTokenRequired(namespace: string, val: boolean): Promise<void>
      unsetWriteTokenRequired(namespace: string): Promise<void>

      setReadTokenRequired(namespace: string, val: boolean): Promise<void>
      unsetReadTokenRequired(namespace: string): Promise<void>

      setDeleteTokenRequired(namespace: string, val: boolean): Promise<void>
      unsetDeleteTokenRequired(namespace: string): Promise<void>
    }
  }
}

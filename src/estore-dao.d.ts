type CustomError = import('@blackglory/errors').CustomError

interface IEStoreDAO {
  hasItem(namespace: string, id: string): Promise<boolean>
  getItemSize(namespace: string, id: string): Promise<number>

  /**
   * @throws {NotFound}
   */
  appendEvent(namespace: string, id: string, payload: string, index?: number): Promise<void>

  getEvent(namespace: string, id: string, index: number): Promise<string | null>
  getAllEvents(namespace: string, id: string): Promise<string[] | null>

  /**
   * @throws {NotFound}
   */
  deleteItem(namespace: string, id: string): Promise<void>

  clearItems(namespace: string): Promise<void>
  stats(namespace: string): Promise<IStats>

  getAllItemIds(namespace: string): AsyncIterable<string>
  getAllNamespaces(): AsyncIterable<string>

  NotFound: new (namespace: string, id: string) => CustomError
  IllegalIndex: new (namespace: string, id: string) => CustomError
}

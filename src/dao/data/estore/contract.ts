import { CustomError } from '@blackglory/errors'
import { IStats } from '@api/contract.js'
export { IStats } from '@api/contract.js'

export interface IEStoreDAO {
  hasItem(namespace: string, id: string): boolean
  getItemSize(namespace: string, id: string): number

  /**
   * @throws {NotFound}
   */
  appendEvent(
    namespace: string
  , id: string
  , payload: string
  , index?: number
  ): void

  getEvent(namespace: string, id: string, index: number): string | null
  getAllEvents(namespace: string, id: string): string[] | null

  /**
   * @throws {NotFound}
   */
  deleteItem(namespace: string, id: string): void

  clearItems(namespace: string): void
  stats(namespace: string): IStats

  getAllItemIds(namespace: string): Iterable<string>
  getAllNamespaces(): Iterable<string>

  NotFound: new (namespace: string, id: string) => CustomError
  IllegalIndex: new (namespace: string, id: string) => CustomError
}

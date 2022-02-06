import { isAdmin } from './admin'
import * as Blacklist from './blacklist'
import * as Whitelist from './whitelist'
import * as JsonSchema from './json-schema'
import { TBAC } from './token-based-access-control'
import * as EStore from './estore'

export const Core: ICore = {
  isAdmin
, EStore
, Blacklist
, Whitelist
, JsonSchema
, TBAC
}

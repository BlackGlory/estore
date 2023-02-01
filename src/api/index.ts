import { isAdmin } from './admin.js'
import * as Blacklist from './blacklist.js'
import * as Whitelist from './whitelist.js'
import * as JsonSchema from './json-schema.js'
import { TBAC } from './token-based-access-control/index.js'
import * as EStore from './estore.js'
import { IAPI } from './contract.js'

export const api: IAPI = {
  isAdmin
, EStore
, Blacklist
, Whitelist
, JSONSchema: JsonSchema
, TBAC
}

import { isAdmin } from './admin.js'
import * as EStore from './estore.js'
import { IAPI } from './contract.js'

export const api: IAPI = {
  isAdmin
, EStore
}

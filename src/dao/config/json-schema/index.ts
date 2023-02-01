import {
  getAllNamespacesWithJSONSchema
, getJSONSchema
, removeJSONSchema
, setJSONSchema
} from './json-schema.js'
import { IJSONSchemaDAO } from './contract.js'

export const JSONSchemaDAO: IJSONSchemaDAO = {
  getAllNamespacesWithJSONSchema
, getJSONSchema
, removeJSONSchema
, setJSONSchema
}

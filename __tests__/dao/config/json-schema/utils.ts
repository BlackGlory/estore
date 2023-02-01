import { getDatabase } from '@dao/config/database.js'

interface IRawJSONSchema {
  namespace: string
  json_schema: string
}

export function setRawJSONSchema(item: IRawJSONSchema): IRawJSONSchema {
  getDatabase().prepare(`
    INSERT INTO estore_json_schema (namespace, json_schema)
    VALUES ($namespace, $json_schema);
  `).run(item)

  return item
}

export function hasRawJSONSchema(namespace: string): boolean {
  return !!getRawJSONSchema(namespace)
}

export function getRawJSONSchema(namespace: string): IRawJSONSchema | undefined {
  return getDatabase().prepare(`
    SELECT *
      FROM estore_json_schema
     WHERE namespace = $namespace;
  `).get({ namespace }) as IRawJSONSchema | undefined
}
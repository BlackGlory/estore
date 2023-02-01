import { getDatabase } from '@dao/config/database.js'

interface IRawJsonSchema {
  namespace: string
  json_schema: string
}

export function setRawJSONSchema(item: IRawJsonSchema): IRawJsonSchema {
  getDatabase().prepare(`
    INSERT INTO estore_json_schema (namespace, json_schema)
    VALUES ($namespace, $json_schema);
  `).run(item)

  return item
}

export function hasRawJSONSchema(namespace: string): boolean {
  return !!getRawJSONSchema(namespace)
}

export function getRawJSONSchema(namespace: string): IRawJsonSchema | null {
  return getDatabase().prepare(`
    SELECT *
      FROM estore_json_schema
     WHERE namespace = $namespace;
  `).get({ namespace })
}

import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllNamespacesWithJSONSchema = withLazyStatic((): string[] => {
  const result = lazyStatic(() => getDatabase().prepare(`
    SELECT namespace
      FROM estore_json_schema
  `), [getDatabase()])
    .all() as Array<{ namespace: string }>

  return result.map(x => x['namespace'])
})

export const getJSONSchema = withLazyStatic((namespace: string): string | null => {
  const result = lazyStatic(() => getDatabase().prepare(`
    SELECT json_schema
      FROM estore_json_schema
     WHERE namespace = $namespace;
  `), [getDatabase()])
    .get({ namespace }) as { json_schema: string } | undefined

  return result ? result['json_schema'] : null
})

export const setJSONSchema = withLazyStatic((
  { namespace, schema }: {
    namespace: string
    schema: string
  }
): void => {
  lazyStatic(() => getDatabase().prepare(`
    INSERT INTO estore_json_schema (namespace, json_schema)
    VALUES ($namespace, $schema)
        ON CONFLICT(namespace)
        DO UPDATE SET json_schema = $schema;
  `), [getDatabase()]).run({ namespace, schema })
})

export const removeJSONSchema = withLazyStatic((namespace: string): void => {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM estore_json_schema
     WHERE namespace = $namespace;
  `), [getDatabase()]).run({ namespace })
})

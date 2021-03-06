import { getDatabase } from '@dao/config-in-sqlite3/database'

interface IRawBlacklist {
  namespace: string
}

interface IRawWhitelist {
  namespace: string
}

interface IRawTokenPolicy {
  namespace: string
  write_token_required: number | null
  read_token_required: number | null
  delete_token_required: number | null
}

interface IRawToken {
  token: string
  namespace: string
  write_permission: number
  read_permission: number
  delete_permission: number
}

export function setRawBlacklist(item: IRawBlacklist): IRawBlacklist {
  getDatabase().prepare(`
    INSERT INTO estore_blacklist (namespace)
    VALUES ($namespace);
  `).run(item)

  return item
}

export function hasRawBlacklist(namespace: string): boolean {
  return !!getRawBlacklist(namespace)
}

export function getRawBlacklist(namespace: string): IRawBlacklist | null {
  return getDatabase().prepare(`
    SELECT *
      FROM estore_blacklist
     WHERE namespace = $namespace;
  `).get({ namespace })
}

export function setRawWhitelist(item: IRawWhitelist): IRawWhitelist {
  getDatabase().prepare(`
    INSERT INTO estore_whitelist (namespace)
    VALUES ($namespace);
  `).run(item)

  return item
}

export function hasRawWhitelist(namespace: string): boolean {
  return !!getRawWhitelist(namespace)
}

export function getRawWhitelist(namespace: string): IRawWhitelist | null {
  return getDatabase().prepare(`
    SELECT *
      FROM estore_whitelist
     WHERE namespace = $namespace;
  `).get({ namespace })
}

export function setRawTokenPolicy<T extends IRawTokenPolicy>(item: T): T {
  getDatabase().prepare(`
    INSERT INTO estore_token_policy (
      namespace
    , write_token_required
    , read_token_required
    , delete_token_required
    )
    VALUES (
      $namespace
    , $write_token_required
    , $read_token_required
    , $delete_token_required
    );
  `).run(item)

  return item
}

export function hasRawTokenPolicy(namespace: string): boolean {
  return !!getRawTokenPolicy(namespace)
}

export function getRawTokenPolicy(namespace: string): IRawTokenPolicy | null {
  return getDatabase().prepare(`
    SELECT *
      FROM estore_token_policy
     WHERE namespace = $namespace;
  `).get({ namespace })
}

export function setRawToken(item: IRawToken): IRawToken {
  getDatabase().prepare(`
    INSERT INTO estore_token (
      token
    , namespace
    , write_permission
    , read_permission
    , delete_permission
    )
    VALUES (
      $token
    , $namespace
    , $write_permission
    , $read_permission
    , $delete_permission
    );
  `).run(item)

  return item
}

export function hasRawToken(token: string, namespace: string): boolean {
  return !!getRawToken(token, namespace)
}

export function getRawToken(token: string, namespace: string): IRawToken | null {
  return getDatabase().prepare(`
    SELECT *
      FROM estore_token
     WHERE token = $token
       AND namespace = $namespace;
  `).get({ token, namespace })
}

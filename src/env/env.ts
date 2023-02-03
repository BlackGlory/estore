import { ValueGetter } from 'value-getter'
import { isNumber } from 'extra-utils'
import { Getter } from '@blackglory/prelude'
import { assert } from '@blackglory/errors'
import { getCache } from '@env/cache.js'
import { getAppRoot } from '@src/utils.js'
import * as path from 'path'

export enum NodeEnv {
  Test
, Development
, Production
}

export const NODE_ENV: Getter<NodeEnv | undefined> =
  env('NODE_ENV')
    .convert(val => {
      switch (val) {
        case 'test': return NodeEnv.Test
        case 'development': return NodeEnv.Development
        case 'production': return NodeEnv.Production
      }
    })
    .memoize(getCache)
    .get()

export const DATA: Getter<string> =
  env('ESTORE_DATA')
    .default(path.join(getAppRoot(), 'data'))
    .memoize(getCache)
    .get()

export const HOST: Getter<string> =
  env('ESTORE_HOST')
    .default('localhost')
    .memoize(getCache)
    .get()

export const PORT: Getter<number> =
  env('ESTORE_PORT')
    .convert(toInteger)
    .default(8080)
    .memoize(getCache)
    .get()

export const PAYLOAD_LIMIT: Getter<number> =
  env('ESTORE_PAYLOAD_LIMIT')
    .convert(toInteger)
    .default(1048576)
    .assert(shouldBePositive)
    .memoize(getCache)
    .get()

export const ADMIN_PASSWORD: Getter<string | undefined> =
  env('ESTORE_ADMIN_PASSWORD')
    .memoize(getCache)
    .get()

export const APPEND_PAYLOAD_LIMIT: Getter<number> =
  env('ESTORE_APPEND_PAYLOAD_LIMIT')
    .convert(toInteger)
    .default(PAYLOAD_LIMIT())
    .memoize(getCache)
    .get()

function env(name: string): ValueGetter<string | undefined> {
  return new ValueGetter(name, () => process.env[name])
}

function toInteger(val: string | number | undefined ): number | undefined {
  if (isNumber(val)) return val
  if (val) return Number.parseInt(val, 10)
}

function shouldBePositive(val: number) {
  assert(val > 0, 'Value must be positive')
}

--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

-- 在WAL模式下, better-sqlite3可充分发挥性能
PRAGMA journal_mode = WAL;

-- SQLite 会将VARCHAR(255)转换为TEXT, 将BOOLEAN转换为NUMERIC, 使用这些数据类型是出于可读性考虑
-- estore资源本身是松散的, 没有自己的表

CREATE TABLE estore_blacklist (
  namespace VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE estore_whitelist (
  namespace VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE estore_token_policy (
  namespace             VARCHAR(255) NOT NULL UNIQUE
, write_token_required  BOOLEAN
, read_token_required   BOOLEAN
, delete_token_required BOOLEAN
);

CREATE TABLE estore_token (
  namespace         VARCHAR(255) NOT NULL
, token             VARCHAR(255) NOT NULL
, read_permission   BOOLEAN      NOT NULL DEFAULT 0 CHECK(read_permission IN (0,1))
, write_permission  BOOLEAN      NOT NULL DEFAULT 0 CHECK(write_permission IN (0,1))
, delete_permission BOOLEAN      NOT NULL DEFAULT 0 CHECK(delete_permission IN (0,1))
, UNIQUE (token, namespace)
);

CREATE TABLE estore_json_schema (
  namespace   VARCHAR(255) NOT NULL UNIQUE
, json_schema TEXT         NOT NULL
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

PRAGMA journal_mode = DELETE;

DROP TABLE estore_blacklist;
DROP TABLE estore_whitelist;
DROP TABLE estore_token_policy;
DROP TABLE estore_token;
DROP TABLE estore_json_schema;

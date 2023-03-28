# EStore
提供以WebSocket为通讯协议的Event Store服务.

## Quickstart
```sh
docker run \
  --detach \
  --publish 8080:8080 \
  blackglory/estore
```

## Install
### 从源代码运行
```sh
git clone https://github.com/BlackGlory/estore
cd estore
yarn install
yarn build
yarn bundle
yarn --silent start
```

### 从源代码构建
```sh
git clone https://github.com/BlackGlory/estore
cd estore
yarn install
yarn docker:build
```

### Recipes
#### docker-compose.yml
```yaml
version: '3.8'

services:
  estore:
    image: 'blackglory/estore'
    restart: always
    volumes:
      - 'estore-data:/data'
    ports:
      - '8080:8080'

volumes:
  estore-data:
```

## API
```ts
interface INamespaceStats {
  items: number
}

interface IAPI {
  getAllNamespaces(): string[]
  getAllItemIds(namespace: string): string[]
  getAllEvents(namespace: string, itemId: string): JSONValue[]

  getNamespaceStats(namespace: string): INamespaceStats

  clearItemsByNamespace(namespace: string): null

  removeItem(namespace: string, itemId: string): null

  /**
   * 获得指定项目内包含的事件数量, 该值等同于下一个事件插入时的索引号.
   * 对于不存在的项目, 它会返回0.
   */
  getItemSize(namespace: string, itemId: string): number

  /**
   * @param nextEventIndex 如果指定, 则会在eventIndex不等于下一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  appendEvent(
    namespace: string
  , itemId: string
  , event: JSONValue
  , nextEventIndex?: number
  ): null

  getEvent(
    namespace: string
  , itemId: string
  , eventIndex: number
  ): JSONValue | null
}

class EventIndexConflict extends CustomError {}
```

## 环境变量
### `ESTORE_HOST`, `ESTORE_PORT`
通过环境变量`ESTORE_HOST`和`ESTORE_PORT`决定服务器监听的地址和端口,
默认值为`localhost`和`8080`.

### `ESTORE_WS_HEARTBEAT_INTERVAL`
通过环境变量`ESTORE_WS_HEARTBEAT_INTERVAL`可以设置WS心跳包(ping帧)的发送间隔, 单位为毫秒.
在默认情况下, 服务不会发送心跳包,
半开连接的检测依赖于服务端和客户端的运行平台的TCP Keepalive配置.

当`ESTORE_WS_HEARTBEAT_INTERVAL`大于零时,
服务会通过WS的ping帧按间隔发送心跳包.

## 客户端
- JavaScript/TypeScript(Node.js, Browser): <https://github.com/BlackGlory/estore-js>

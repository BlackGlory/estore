import { FastifyPluginAsync } from 'fastify'
import { routes as appendRoutes } from './append.js'
import { routes as hasRoutes } from './has.js'
import { routes as sizeRoutes } from './size.js'
import { routes as getEventRoutes } from './get-event.js'
import { routes as getEventsRoutes } from './get-events.js'
import { routes as getAllItemIdsRoutes } from './get-all-item-ids.js'
import { routes as getAllNamespacesRoutes } from './get-all-namespaces.js'
import { routes as deleteRoutes } from './delete.js'
import { routes as clearRoutes } from './clear.js'
import { routes as statsRoutes } from './stats.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  await server.register(appendRoutes, { api: api })
  await server.register(getEventRoutes, { api: api })
  await server.register(getEventsRoutes, { api: api })
  await server.register(sizeRoutes, { api: api })
  await server.register(hasRoutes, { api: api })
  await server.register(getAllItemIdsRoutes, { api: api })
  await server.register(getAllNamespacesRoutes, { api: api })
  await server.register(deleteRoutes, { api: api })
  await server.register(clearRoutes, { api: api })
  await server.register(statsRoutes, { api: api })
}

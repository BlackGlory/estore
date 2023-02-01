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
  server.register(appendRoutes, { api: api })
  server.register(getEventRoutes, { api: api })
  server.register(getEventsRoutes, { api: api })
  server.register(sizeRoutes, { api: api })
  server.register(hasRoutes, { api: api })
  server.register(getAllItemIdsRoutes, { api: api })
  server.register(getAllNamespacesRoutes, { api: api })
  server.register(deleteRoutes, { api: api })
  server.register(clearRoutes, { api: api })
  server.register(statsRoutes, { api: api })
}

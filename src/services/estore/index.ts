import { FastifyPluginAsync } from 'fastify'
import { routes as appendRoutes } from './append'
import { routes as hasRoutes } from './has'
import { routes as sizeRoutes } from './size'
import { routes as getEventRoutes } from './get-event'
import { routes as getEventsRoutes } from './get-events'
import { routes as getAllItemIdsRoutes } from './get-all-item-ids'
import { routes as getAllNamespacesRoutes } from './get-all-namespaces'
import { routes as deleteRoutes } from './delete'
import { routes as clearRoutes } from './clear'
import { routes as statsRoutes } from './stats'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.register(appendRoutes, { Core })
  server.register(getEventRoutes, { Core })
  server.register(getEventsRoutes, { Core })
  server.register(sizeRoutes, { Core })
  server.register(hasRoutes, { Core })
  server.register(getAllItemIdsRoutes, { Core })
  server.register(getAllNamespacesRoutes, { Core })
  server.register(deleteRoutes, { Core })
  server.register(clearRoutes, { Core })
  server.register(statsRoutes, { Core })
}

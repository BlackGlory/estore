import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema } from '@src/schema.js'
import { isntUndefined } from 'extra-utils'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.get<{
    Params: {
      namespace: string
      id: string
    }
  }>(
    '/estore/:namespace/items/:id/events'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , id: idSchema
        }
      }
    }
  , async (req, reply) => {
      const namespace = req.params.namespace
      const id = req.params.id

      const result = api.EStore.getAllEvents(namespace, id)
      if (isntUndefined(result)) {
        return reply.send(result)
      } else {
        return reply
          .status(404)
          .send()
      }
    }
  )
}

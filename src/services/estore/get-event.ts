import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema } from '@src/schema.js'
import { isntUndefined } from 'extra-utils'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.get<{
    Params: {
      namespace: string
      id: string
      index: number
    }
  }>(
    '/estore/:namespace/items/:id/events/:index'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , id: idSchema
        , index: { type: 'integer', minimum: 0 }
        }
      }
    }
  , async (req, reply) => {
      const namespace = req.params.namespace
      const id = req.params.id
      const index = req.params.index

      const result = api.EStore.getEvent(namespace, id, index)
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

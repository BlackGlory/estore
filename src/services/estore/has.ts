import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema } from '@src/schema.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.head<{
    Params: {
      namespace: string
      id: string
    }
  }>(
    '/estore/:namespace/items/:id'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , itemId: idSchema
        }
      }
    }
  , async (req, reply) => {
      const namespace = req.params.namespace
      const id = req.params.id

      const result = api.EStore.has(namespace, id)
      if (result) {
        return reply
          .status(204)
          .send()
      } else {
        return reply
          .status(404)
          .send()
      }
    }
  )
}

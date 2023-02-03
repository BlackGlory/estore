import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema } from '@src/schema.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.delete<{
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
        , id: idSchema
        }
      }
    }
  , async (req, reply) => {
      const namespace = req.params.namespace
      const itemId = req.params.id

      try {
        api.EStore.del(namespace, itemId)
        return reply
          .status(204)
          .send()
      } catch (e) {
        if (e instanceof api.EStore.NotFound) return reply.status(204).send()
        throw e
      }
    }
  )
}

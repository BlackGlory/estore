import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema } from '@src/schema.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.get<{
    Params: {
      namespace: string
      id: string
    }
  }>(
    '/estore/:namespace/items/:id/size'
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

      const result = api.EStore.size(namespace, id)
      return reply.send(result)
    }
  )
}

import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema } from '@src/schema'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.get<{
    Params: { namespace: string }
  }>(
    '/estore/:namespace/stats'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        }
      , response: {
          200: {
            namespace: { type: 'string' }
          , items: { type: 'integer' }
          }
        }
      }
    }
  , async (req, reply) => {
      const namespace = req.params.namespace

      const result = await Core.EStore.stats(namespace)
      reply.send(result)
    }
  )
}

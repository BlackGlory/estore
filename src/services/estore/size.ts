import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema, tokenSchema } from '@src/schema.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.get<{
    Params: {
      namespace: string
      id: string
    }
    Querystring: { token?: string }
  }>(
    '/estore/:namespace/items/:id/size'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , id: idSchema
        }
      , querystring: { token: tokenSchema }
      }
    }
  , async (req, reply) => {
      const namespace = req.params.namespace
      const id = req.params.id
      const token = req.query.token

      try {
        api.Blacklist.check(namespace)
        api.Whitelist.check(namespace)
        api.TBAC.checkReadPermission(namespace, token)
      } catch (e) {
        if (e instanceof api.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof api.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof api.TBAC.Unauthorized) return reply.status(401).send()
        throw e
      }

      const result = api.EStore.size(namespace, id)
      return reply.send(result)
    }
  )
}

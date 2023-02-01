import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema, tokenSchema } from '@src/schema.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.delete<{
    Params: {
      namespace: string
      id: string
    }
    Querystring: { token?: string }
  }>(
    '/estore/:namespace/items/:id'
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
      const itemId = req.params.id
      const token = req.query.token

      try {
        await api.Blacklist.check(namespace)
        await api.Whitelist.check(namespace)
        await api.TBAC.checkDeletePermission(namespace, token)
      } catch (e) {
        if (e instanceof api.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof api.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof api.TBAC.Unauthorized) return reply.status(401).send()
        throw e
      }

      try {
        await api.EStore.del(namespace, itemId)
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

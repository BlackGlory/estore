import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema, tokenSchema } from '@src/schema.js'
import { isntUndefined } from 'extra-utils'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.get<{
    Params: {
      namespace: string
      id: string
    }
    Querystring: { token?: string }
  }>(
    '/estore/:namespace/items/:id/events'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , id: idSchema
        }
      , querystring: {
          token: tokenSchema
        }
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

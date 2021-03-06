import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema, tokenSchema } from '@src/schema'
import { isntUndefined } from '@blackglory/types'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.get<{
    Params: {
      namespace: string
      id: string
      index: number
    }
    Querystring: { token?: string }
  }>(
    '/estore/:namespace/items/:id/events/:index'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , id: idSchema
        , index: { type: 'integer', minimum: 0 }
        }
      , querystring: { token: tokenSchema }
      }
    }
  , async (req, reply) => {
      const namespace = req.params.namespace
      const id = req.params.id
      const index = req.params.index
      const token = req.query.token

      try {
        await Core.Blacklist.check(namespace)
        await Core.Whitelist.check(namespace)
        await Core.TBAC.checkReadPermission(namespace, token)
      } catch (e) {
        if (e instanceof Core.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.TBAC.Unauthorized) return reply.status(401).send()
        throw e
      }

      const result = await Core.EStore.getEvent(namespace, id, index)
      if (isntUndefined(result)) {
        reply.send(result)
      } else {
        reply.status(404).send()
      }
    }
  )
}

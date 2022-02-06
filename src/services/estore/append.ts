import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema, tokenSchema } from '@src/schema'
import { APPEND_PAYLOAD_LIMIT } from '@env'
import { CustomError } from '@blackglory/errors'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.post<{
    Params: {
      namespace: string
      id: string
    }
    Querystring: { token?: string }
    Body: string
    Headers: {
      'if-match'?: number
    }
  }>(
    '/estore/:namespace/items/:id/events'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , id: idSchema
        }
      , querystring: { token: tokenSchema }
      , headers: {
          'if-match': { type: 'integer', minimum: 0, nulable: true }
        }
      , response: {
          204: { type: 'null' }
        }
      }
    , bodyLimit: APPEND_PAYLOAD_LIMIT()
    }
  , async (req, reply) => {
      const namespace = req.params.namespace
      const id = req.params.id
      const payload = req.body
      const token = req.query.token
      // fastify会在设置Headers的接口后丢失类型, 所以手动设置类型
      const index = req.headers['if-match'] as number | undefined

      try {
        await Core.Blacklist.check(namespace)
        await Core.Whitelist.check(namespace)
        await Core.TBAC.checkWritePermission(namespace, token)
        if (Core.JsonSchema.isEnabled()) {
          await Core.JsonSchema.validate(namespace, payload)
        }
      } catch (e) {
        if (e instanceof Core.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.TBAC.Unauthorized) return reply.status(401).send()
        if (e instanceof Core.JsonSchema.InvalidPayload) return reply.status(400).send()
        if (e instanceof BadContentType) return reply.status(415).send()
        throw e
      }

      try {
        await Core.EStore.append(
          namespace
        , id
        , payload
        , index
        )
        reply.status(204).send()
      } catch (e) {
        if (e instanceof Core.EStore.IllegalIndex) return reply.status(412).send()
        throw e
      }
    }
  )
}

class BadContentType extends CustomError {
  constructor(contentType: string) {
    super(`Content-Type must be ${contentType}`)
  }
}

import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema, tokenSchema } from '@src/schema.js'
import { APPEND_PAYLOAD_LIMIT } from '@env/index.js'
import { CustomError } from '@blackglory/errors'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
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
          'if-match': { type: 'integer', minimum: 0, nullable: true }
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
        api.Blacklist.check(namespace)
        api.Whitelist.check(namespace)
        api.TBAC.checkWritePermission(namespace, token)
        if (api.JSONSchema.isEnabled()) {
          api.JSONSchema.validate(namespace, payload)
        }
      } catch (e) {
        if (e instanceof api.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof api.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof api.TBAC.Unauthorized) return reply.status(401).send()
        if (e instanceof api.JSONSchema.InvalidPayload) {
          return reply.status(400).send()
        }
        if (e instanceof BadContentType) return reply.status(415).send()
        throw e
      }

      try {
        api.EStore.append(namespace, id, payload, index)
        return reply
          .status(204)
          .send()
      } catch (e) {
        if (e instanceof api.EStore.IllegalIndex) return reply.status(412).send()
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

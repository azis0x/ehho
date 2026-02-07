import { randomUUID } from "crypto"
import { HEADER_REQUEST_ID, HTTP_BAD_REQUEST } from "@/constants"
import { logger } from "@/lib/logger"
import { pinoHttp } from "pino-http"

export const httpLogger = pinoHttp({
  logger,

  genReqId(req, res) {
    const existing = req.headers[HEADER_REQUEST_ID]

    if (existing && typeof existing === "string") {
      return existing
    }

    const id = randomUUID()
    res.setHeader(HEADER_REQUEST_ID, id)
    return id
  },

  customLogLevel(_req, res, err) {
    if (res.statusCode >= 500 || err) return "error"
    if (res.statusCode >= HTTP_BAD_REQUEST) return "warn"
    return "info"
  },

  customSuccessMessage(req, _res) {
    return `${req.method} ${req.url} completed`
  },

  customErrorMessage(req, _res, err) {
    return `${req.method} ${req.url} errored: ${err.message}`
  },

  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
      }
    },

    res(res) {
      return {
        statusCode: res.statusCode,
      }
    },
  },
})

import { IS_DEV, REDACT_PATHS } from "@/constants"
import pino from "pino"

const transport = IS_DEV
  ? {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
        singleLine: false,
      },
    }
  : undefined

export const logger = pino({
  level: process.env.LOG_LEVEL || (IS_DEV ? "debug" : "info"),

  base: {
    app: "ehho",
  },

  redact: {
    paths: REDACT_PATHS,
    censor: "[REDACTED]",
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  transport,
})

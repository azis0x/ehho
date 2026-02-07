import { HTTP_INTERNAL_SERVER_ERROR, HTTP_NOT_FOUND, IS_PROD } from "@/constants"
import { HTTPExceptions } from "@/errors/http-exceptions"
import { logger } from "@/lib/logger"
import type { NextFunction, Request, Response } from "express"

export function notFound(req: Request, res: Response) {
  const url = req.originalUrl
  const message = "Could not found requested resource."
  const details = [`Path ${url} not found.`]

  return res.status(HTTP_NOT_FOUND).json({
    success: false,
    message,
    details,
  })
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // Known HTTP error
  if (err instanceof HTTPExceptions) {
    if (err.statusCode >= HTTP_INTERNAL_SERVER_ERROR) {
      logger.error(
        {
          err,
          path: req.path,
          method: req.method,
        },
        err.message,
      )
    } else {
      logger.warn(
        {
          err,
          path: req.path,
          method: req.method,
        },
        err.message,
      )
    }

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.details ?? undefined,
      ...(IS_PROD ? {} : { stack: err.stack }),
    })
  }

  // Unknown error (programmer error)
  logger.error(
    {
      err,
      path: req.path,
      method: req.method,
    },
    "Unhandled error",
  )

  return res.status(HTTP_INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
    ...(IS_PROD ? {} : { stack: err instanceof Error ? err.stack : undefined }),
  })
}

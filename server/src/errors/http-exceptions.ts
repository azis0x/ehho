import type { HTTPStatusCode } from "@/constants"

export class HTTPExceptions extends Error {
  public statusCode: HTTPStatusCode
  public isOperational: boolean
  public details: unknown

  constructor(message: string, statusCode: HTTPStatusCode, details?: unknown) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.details = details
    this.isOperational = statusCode < 500

    Error.captureStackTrace(this, this.constructor)
  }
}

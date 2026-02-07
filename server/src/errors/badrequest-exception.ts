import { HTTPExceptions } from "./http-exceptions"

export class BadRequestException extends HTTPExceptions {
  constructor(message = "Bad Request", details?: unknown) {
    super(message, 400, details)
  }
}

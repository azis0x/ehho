import { HTTPExceptions } from "./http-exceptions"

export class UnauthorizedException extends HTTPExceptions {
  constructor(message = "Unauthorized", details?: unknown) {
    super(message, 401, details)
  }
}

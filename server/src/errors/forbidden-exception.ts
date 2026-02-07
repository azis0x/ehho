import { HTTPExceptions } from "./http-exceptions"

export class ForbiddenException extends HTTPExceptions {
  constructor(message = "Forbidden", details?: unknown) {
    super(message, 403, details)
  }
}

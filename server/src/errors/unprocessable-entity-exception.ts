import { HTTPExceptions } from "./http-exceptions"

export class UnprocessableEntityException extends HTTPExceptions {
  constructor(message = "Validation failed", details?: unknown) {
    super(message, 422, details)
  }
}

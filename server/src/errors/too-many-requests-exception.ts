import { HTTPExceptions } from "./http-exceptions"

export class TooManyRequestsException extends HTTPExceptions {
  constructor(message = "Too many requests") {
    super(message, 429)
  }
}

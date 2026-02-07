import { HTTPExceptions } from "./http-exceptions"

export class ServiceUnavailableException extends HTTPExceptions {
  constructor(message = "Service unavailable") {
    super(message, 503)
  }
}

import { HTTPExceptions } from "./http-exceptions"

export class ConflictException extends HTTPExceptions {
  constructor(message = "Conflict") {
    super(message, 409)
  }
}

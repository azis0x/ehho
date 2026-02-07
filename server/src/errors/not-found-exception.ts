import { HTTPExceptions } from "./http-exceptions"

export class NotFoundException extends HTTPExceptions {
  constructor(message = "Resource not found") {
    super(message, 404)
  }
}

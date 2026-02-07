import { UnprocessableEntityException } from "./unprocessable-entity-exception"

export class ValidationException extends UnprocessableEntityException {
  constructor(errors: unknown) {
    super("Validation failed", errors)
  }
}

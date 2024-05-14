import { BaseError } from '#domains/Ship/Exceptions/BaseError'
import { AuthExceptions } from '../Interfaces/AuthExceptionType.js'

export default class AuthError extends BaseError {
  constructor(exceptionName: AuthExceptions) {
    super(exceptionName)
  }
}

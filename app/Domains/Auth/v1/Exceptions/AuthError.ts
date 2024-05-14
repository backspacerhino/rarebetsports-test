import { BaseError } from '#domains/Ship/Exceptions/BaseError'
import { AuthExceptions } from '../../../Main/v1/Interfaces/SleepExceptionType.js'

export default class AuthError extends BaseError {
  constructor(exceptionName: AuthExceptions) {
    super(exceptionName)
  }
}

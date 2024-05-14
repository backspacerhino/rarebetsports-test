import { BaseError } from '#domains/Ship/Exceptions/BaseError'
import { UserExceptions } from '../Interfaces/UserExceptionType.js'

export default class AuthError extends BaseError {
  constructor(exceptionName: UserExceptions) {
    super(exceptionName)
  }
}

import { BaseError } from '#domains/Ship/Exceptions/BaseError'
import { GeneralExceptions } from '../Interfaces/GeneralExceptionType.js'

export default class GeneralError extends BaseError {
  constructor(exceptionName: GeneralExceptions) {
    super(exceptionName)
  }
}

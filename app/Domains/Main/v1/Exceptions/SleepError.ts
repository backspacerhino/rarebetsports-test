import { BaseError } from '#domains/Ship/Exceptions/BaseError'
import { SleepExceptions } from '../Interfaces/SleepExceptionType.js'

export default class SleepError extends BaseError {
  constructor(exceptionName: SleepExceptions) {
    super(exceptionName)
  }
}

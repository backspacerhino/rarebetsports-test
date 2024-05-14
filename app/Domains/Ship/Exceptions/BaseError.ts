import { exceptions } from '#domains/Ship/Exceptions/Exceptions'
import { Exception } from '@adonisjs/core/exceptions'

export abstract class BaseError extends Exception {
  constructor(exceptionName: any) {
    let exception = exceptions[exceptionName]
    if (!exception) {
      exception = exceptions['DEFAULT_UNHANDLED']
    }
    super(exception.message!, {
      code: exceptionName,
      status: exception.statusCode!,
    })
  }
}

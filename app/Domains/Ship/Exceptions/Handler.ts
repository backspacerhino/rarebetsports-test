import { Environments } from '#domains/Ship/Enums/Environments'
import { exceptions } from '#domains/Ship/Exceptions/Exceptions'
import ErrorTransformer from '#domains/Ship/Transformers/Json/ErrorTransformer'
import env from '#start/env'
import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    let exceptionName = error.code || ''
    const errors = error.messages
    // This handles built in E_ AdonisJS errors
    if (exceptionName.startsWith('E_')) {
      if (env.get('NODE_ENV') === Environments.DEV) {
        console.log('Development error log:', error)
      }
      exceptionName = exceptionName.split(':')[0]
    }
    let exception = exceptions[exceptionName]
    if (!exception) {
      exception = exceptions['DEFAULT_UNHANDLED']
    }

    if (errors) {
      exception.errors = errors
    }

    return ctx.response
      .status(exception.statusCode)
      .send(new ErrorTransformer().transform(exception))
    // return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}

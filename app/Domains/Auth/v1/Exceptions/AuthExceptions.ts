import { CustomException } from '#domains/Ship/Interfaces/CustomException'
import { AuthExceptions } from '../Interfaces/AuthExceptionType.js'

// Auth errors are 200-299
export const authExceptions: Record<AuthExceptions, CustomException> = {
  WRONG_CREDENTIALS: {
    internalCode: 200,
    statusCode: 404, // This is wrong credentials but we don't want to let potential attacker know that information
    message: 'Resource not found or wrong credentials.',
  },
}

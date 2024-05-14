import { authExceptions } from '#domains/Auth/v1/Exceptions/AuthExceptions'
import { userExceptions } from '#domains/User/v1/Exceptions/UserExceptions'
import { CustomException } from '../Interfaces/CustomException.js'

export const exceptions: Record<string, CustomException> = {
  DEFAULT_UNHANDLED: {
    internalCode: 1,
    statusCode: 500,
    message: "Internal server error. We've been notified.",
  },
  DEFAULT_HANDLED: {
    internalCode: 2,
    statusCode: 500,
    message: "Internal server error. We've been notified.",
  },

  FORBIDDEN: {
    internalCode: 3,
    statusCode: 404, // This is forbidden but we don't want to let potential attacker know that information
    message: 'Resource not found.',
  },
  E_ROW_NOT_FOUND: {
    internalCode: 3,
    statusCode: 404, // This is forbidden but we don't want to let potential attacker know that information
    message: 'Resource not found.',
  },
  ROW_NOT_FOUND: {
    // Duplicate for framework compatibility (We dint want to use GeneralError("E_ROW_NOT_FOUND") instead we want GeneralError("ROW_NOT_FOUND"))
    internalCode: 3,
    statusCode: 404,
    message: 'Resource not found.',
  },
  E_UNAUTHORIZED_ACCESS: {
    internalCode: 4,
    statusCode: 401,
    message: 'Unauthorized access.',
  },
  E_ROUTE_NOT_FOUND: {
    internalCode: 5,
    statusCode: 400,
    message: 'Route not found.',
  },
  E_VALIDATION_ERROR: {
    internalCode: 6,
    statusCode: 422,
    message: 'Validation errors found.',
  },
  E_AUTHORIZATION_FAILURE: {
    internalCode: 7,
    statusCode: 401,
    message: 'Not authorized to perform this action.',
  },
  ISO_TIME_ERROR: {
    internalCode: 8,
    statusCode: 422,
    message: 'ISO time error.',
  },
  ...userExceptions,
  ...authExceptions,
}

import { CustomException } from '#domains/Ship/Interfaces/CustomException'
import { UserExceptions } from '../Interfaces/UserExceptionType.js'

// User errors are 100-199
export const userExceptions: Record<UserExceptions, CustomException> = {
  USER_NOT_FOUND: {
    internalCode: 100,
    statusCode: 404,
    message: 'User resource not found.',
  },
}

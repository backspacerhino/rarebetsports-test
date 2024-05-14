import { CustomException } from '#domains/Ship/Interfaces/CustomException'
import { UserExceptions } from '../Interfaces/UserExceptionType.js'

// User errors are 100-199
export const userExceptions: Record<UserExceptions, CustomException> = {
  EMAIL_EXISTS: {
    internalCode: 100,
    statusCode: 422,
    message: 'Email exists.',
  },
}

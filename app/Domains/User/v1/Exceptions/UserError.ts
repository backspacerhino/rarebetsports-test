import { UserExceptions } from '../Interfaces/UserExceptionType'

export default class UserError extends Error {
  constructor(exceptionName: UserExceptions) {
    super(exceptionName)
  }
}

import AuthError from '#domains/Auth/v1/Exceptions/AuthError'
import BaseAction from '#domains/Ship/Actions/BaseAction'
import IRunnable from '#domains/Ship/Interfaces/IRunnable'
import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import hash from '@adonisjs/core/services/hash'
import User from '../../../User/v1/Models/User.js'
import { IUserRepository } from '../Interfaces/IUserRepository.js'
import { UserData } from '../Interfaces/UserData.js'

export class LoginUserAction extends BaseAction implements IRunnable {
  #userRepository: IUserRepository
  constructor() {
    super()
    this.#userRepository = new UserRepository()
  }

  async run(data: UserData) {
    const user = await this.#userRepository.findByOrFail('email', data.email)
    const passwordCorrect = await hash.verify(user.password, data.password)

    if (!passwordCorrect) {
      throw new AuthError('WRONG_CREDENTIALS')
    }
    const token = await User.accessTokens.create(user)
    return token
  }
}

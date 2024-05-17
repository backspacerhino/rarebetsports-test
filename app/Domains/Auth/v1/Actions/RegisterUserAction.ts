import BaseAction from '#domains/Ship/Actions/BaseAction'
import IRunnable from '#domains/Ship/Interfaces/IRunnable'
import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import User from '../../../User/v1/Models/User.js'
import { IUserRepository } from '../Interfaces/IUserRepository.js'
import { UserData } from '../Interfaces/UserData.js'

export class RegisterUserAction extends BaseAction implements IRunnable {
  #userRepository: IUserRepository
  constructor() {
    super()
    this.#userRepository = new UserRepository()
  }

  async run(data: UserData) {
    const user = await this.#userRepository.register({
      email: data.email,
      password: data.password,
    })
    const token = await User.accessTokens.create(user)
    return token
  }
}

import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import User from '../../../User/v1/Models/User.js'
import { IUserRepository } from '../Interfaces/IUserRepository.js'
import { UserData } from '../Interfaces/UserData.js'

export class RegisterUserAction {
  #userRepository: IUserRepository
  constructor() {
    this.#userRepository = new UserRepository()
  }

  // TODO: Fix type
  async run(data: UserData) {
    const user = await this.#userRepository.register({
      email: data.email,
      password: data.password,
    })
    const token = await User.accessTokens.create(user) // TODO: Move to repo
    return token
  }
}

import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import hash from '@adonisjs/core/services/hash'
import User from '../../../User/v1/Models/User.js'
import { IUserRepository } from '../Interfaces/IUserRepository.js'
import { UserData } from '../Interfaces/UserData.js'

export class LoginUserAction {
  #userRepository: IUserRepository
  constructor() {
    this.#userRepository = new UserRepository()
  }

  // TODO: Fix type
  async run(data: UserData) {
    const user = await this.#userRepository.findByOrFail('email', data.email)
    const passwordCorrect = await hash.verify(user.password, data.password)
    if (!passwordCorrect) {
      throw new Error('Invalid password') // TODO: Change errro
    }
    const token = await User.accessTokens.create(user) // TODO: Move to repo
    return token
  }
}

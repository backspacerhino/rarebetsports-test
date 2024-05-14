import { BaseRepository } from '#domains/Ship/Repositories/BaseRepository'
import UserError from '../Exceptions/UserError.js'
import { IUserRepository } from '../Interfaces/IUserRepository.js'
import { UserData } from '../Interfaces/UserData.js'
import User from '../Models/User.js'

export class UserRepository extends BaseRepository<typeof User> implements IUserRepository {
  constructor() {
    super(User)
  }

  async register(data: UserData) {
    try {
      return await User.create({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      throw new UserError('EMAIL_EXISTS')
    }
  }
}

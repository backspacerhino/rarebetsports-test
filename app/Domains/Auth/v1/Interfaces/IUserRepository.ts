import { IBaseRepository } from '#domains/Ship/Interfaces/IBaseRepository'
import User from '../../../User/v1/Models/User.js'
import { UserData } from './UserData.js'

export interface IUserRepository extends IBaseRepository<User> {
  register(data: UserData): Promise<User>
}

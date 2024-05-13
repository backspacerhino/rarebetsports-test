import BaseCacheRepository from '#domains/Ship/Repositories/BaseCacheRepository'
import { IUserCacheRepository } from '../Interfaces/IUserCacheRepository.js'
import User from '../Models/User.js'

export class UserCacheRepository
  extends BaseCacheRepository<typeof User>
  implements IUserCacheRepository
{
  constructor() {
    super(User)
  }
}

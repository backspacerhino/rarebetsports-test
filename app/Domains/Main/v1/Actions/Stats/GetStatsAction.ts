import BaseAction from '#domains/Ship/Actions/BaseAction'
import IRunnable from '#domains/Ship/Interfaces/IRunnable'
import { IUserCacheRepository } from '#domains/User/v1/Interfaces/IUserCacheRepository'
import { UserCacheRepository } from '#domains/User/v1/Repositories/UserCacheRepository'
import { HttpContext } from '@adonisjs/core/http'
import { AverageSleepData } from '../../Interfaces/Cache/AverageSleepData.js'

export class GetStatsAction extends BaseAction implements IRunnable {
  #userCacheRepository: IUserCacheRepository

  constructor() {
    super()
    this.#userCacheRepository = new UserCacheRepository()
  }

  async run(): Promise<AverageSleepData | null> {
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()
    return (await this.#userCacheRepository.findById({
      id: authUser.id,
      key: 'average_sleep',
    })) as AverageSleepData | null
  }
}

import BaseAction from '#domains/Ship/Actions/BaseAction'
import GeneralError from '#domains/Ship/Exceptions/GeneralError'
import IRunnable from '#domains/Ship/Interfaces/IRunnable'
import { ResourceIdValidatorData } from '#domains/Ship/Interfaces/Validators/ResourceIdValidatorData'
import { HttpContext } from '@adonisjs/core/http'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class GetSleepEntryAction extends BaseAction implements IRunnable {
  #sleepRepository: ISleepRepository
  constructor() {
    super()
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: ResourceIdValidatorData) {
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()
    const result = await this.#sleepRepository.findByOrFail('id', data.id)
    if (result.userId !== authUser.id) {
      throw new GeneralError('ROW_NOT_FOUND')
    }
    return result
  }
}

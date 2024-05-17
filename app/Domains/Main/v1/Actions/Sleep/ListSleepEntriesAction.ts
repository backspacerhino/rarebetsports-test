import BaseAction from '#domains/Ship/Actions/BaseAction'
import IRunnable from '#domains/Ship/Interfaces/IRunnable'
import { HttpContext } from '@adonisjs/core/http'
import SleepError from '../../Exceptions/SleepError.js'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { ListSleepEntriesValidatorData } from '../../Interfaces/Validators/ListSleepEntriesValidatorData.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class ListSleepEntriesAction extends BaseAction implements IRunnable {
  #sleepRepository: ISleepRepository

  constructor() {
    super()
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: ListSleepEntriesValidatorData) {
    if (
      data.minimum_duration &&
      data.maximum_duration &&
      data.minimum_duration > data.maximum_duration
    ) {
      throw new SleepError('MIN_DURATION_GREATER_THAN_MAX_DURATION')
    }
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()

    return await this.#sleepRepository.list({ data, authUser })
  }
}

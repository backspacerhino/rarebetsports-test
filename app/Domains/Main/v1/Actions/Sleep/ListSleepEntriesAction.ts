import { HttpContext } from '@adonisjs/core/http'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { ListSleepEntriesValidatorData } from '../../Interfaces/Validators/ListSleepEntriesValidatorData.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class ListSleepEntriesAction {
  #sleepRepository: ISleepRepository

  constructor() {
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: ListSleepEntriesValidatorData) {
    if (
      data.minimum_duration &&
      data.maximum_duration &&
      data.minimum_duration > data.maximum_duration
    ) {
      throw new Error('minimum cant be bigger than maximum') // TODO: Throw proper error
    }
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()

    return await this.#sleepRepository.list({ data, authUser })
  }
}

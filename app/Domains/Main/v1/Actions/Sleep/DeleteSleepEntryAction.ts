import { ResourceIdValidatorData } from '#domains/Ship/Interfaces/Validators/ResourceIdValidatorData'
import { HttpContext } from '@adonisjs/core/http'
import SleepEntryChanged from '../../Events/SleepEntryChanged.js'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class DeleteSleepEntryAction {
  #sleepRepository: ISleepRepository

  constructor() {
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: ResourceIdValidatorData) {
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()
    const sleepEntry = await this.#sleepRepository.deleteByIdOrFail({ id: data.id, authUser })
    SleepEntryChanged.dispatch(sleepEntry)
  }
}

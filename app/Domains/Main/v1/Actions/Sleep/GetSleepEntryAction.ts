import { ResourceIdValidatorData } from '#domains/Ship/Interfaces/Validators/ResourceIdValidatorData'
import { HttpContext } from '@adonisjs/core/http'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class GetSleepEntryAction {
  #sleepRepository: ISleepRepository
  constructor() {
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: ResourceIdValidatorData) {
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()
    const result = await this.#sleepRepository.findByOrFail('id', data.id)
    if (result.userId !== authUser.id) {
      throw new Error('Row not found.') // TODO: FIx error
    }
    return result
  }
}

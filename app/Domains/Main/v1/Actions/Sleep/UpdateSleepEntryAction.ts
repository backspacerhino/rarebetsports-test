import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import SleepEntryChanged from '../../Events/SleepEntryChanged.js'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { UpdateSleepEntryValidatorData } from '../../Interfaces/Validators/UpdateSleepEntryValidatorData.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class UpdateSleepEntryAction {
  #sleepRepository: ISleepRepository

  constructor() {
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: UpdateSleepEntryValidatorData) {
    const { params, ...updateData } = data
    const id = params.id

    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()

    const payload: Record<string, any> = {
      wakeupTimes: updateData.wakeup_times,
    }

    const sleepEntry = await this.#sleepRepository.findByOrFail('id', id)
    let start = sleepEntry.start
    let end = sleepEntry.end

    if (updateData.start) {
      start = DateTime.fromISO(updateData.start.toISOString())
      payload.start = start
    }

    if (updateData.end) {
      end = DateTime.fromISO(updateData.end.toISOString())
      payload.end = end
    }

    payload.date = start.toISODate()

    if (start > end) {
      throw new Error('Sleep start cant be later than sleep end') // TODO: Throw proper error
    }

    if (sleepEntry.userId !== authUser.id) {
      throw new Error('Row not found.') // TODO: Throw proper error
    }

    const result = await sleepEntry.merge(JSON.parse(JSON.stringify(payload))).save()
    SleepEntryChanged.dispatch(result)
    return result
  }
}

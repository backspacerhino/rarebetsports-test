import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import SleepEntryCreated from '../../Events/SleepEntryCreated.js'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { CreateSleepEntryValidatorData } from '../../Interfaces/Validators/CreateSleepEntryValidatorData.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class CreateSleepEntryAction {
  #sleepRepository: ISleepRepository
  constructor() {
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: CreateSleepEntryValidatorData) {
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()

    const sleepStart = DateTime.fromJSDate(data.start)
    const sleepEnd = DateTime.fromJSDate(data.end)

    if (sleepStart > sleepEnd) {
      throw new Error('Sleep start cant be later than sleep end') // TODO: Throw proper error
    }
    const diff = sleepEnd.diff(sleepStart, ['minutes'])

    const sleepEntry = await this.#sleepRepository.create({
      date: sleepStart.toISODate(),
      start: sleepStart.toString(),
      end: sleepEnd.toString(),
      duration: diff.minutes,
      wakeupTimes: data.wakeup_times,
      userId: authUser.id,
    })

    SleepEntryCreated.dispatch(sleepEntry)

    return sleepEntry
  }
}

import BaseAction from '#domains/Ship/Actions/BaseAction'
import IRunnable from '#domains/Ship/Interfaces/IRunnable'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import SleepEntryCreated from '../../Events/SleepEntryCreated.js'
import SleepError from '../../Exceptions/SleepError.js'
import { ISleepRepository } from '../../Interfaces/Sleep/ISleepRepository.js'
import { CreateSleepEntryValidatorData } from '../../Interfaces/Validators/CreateSleepEntryValidatorData.js'
import { SleepRepository } from '../../Repositories/SleepRepository.js'

export class CreateSleepEntryAction extends BaseAction implements IRunnable {
  #sleepRepository: ISleepRepository
  constructor() {
    super()
    this.#sleepRepository = new SleepRepository()
  }

  async run(data: CreateSleepEntryValidatorData) {
    const ctx = HttpContext.getOrFail()
    const authUser = ctx.auth.getUserOrFail()

    const sleepStart = DateTime.fromJSDate(data.start)
    const sleepEnd = DateTime.fromJSDate(data.end)

    if (sleepStart > sleepEnd) {
      throw new SleepError('START_LATER_THAN_END')
    }
    const diff = sleepEnd.diff(sleepStart, ['minutes'])

    const sleepEntry = await this.#sleepRepository.create({
      date: sleepStart.toISODate()!,
      start: sleepStart.toString(),
      end: sleepEnd.toString(),
      duration: diff.minutes,
      wakeupTimes: data.wakeup_times,
      userId: authUser.id,
    } as any) // TODO: Fix type

    SleepEntryCreated.dispatch(sleepEntry)

    return sleepEntry
  }
}

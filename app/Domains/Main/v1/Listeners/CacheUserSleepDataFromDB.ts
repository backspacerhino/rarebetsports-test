import { DateTime } from 'luxon'
import { IUserCacheRepository } from '../../../User/v1/Interfaces/IUserCacheRepository.js'
import { UserCacheRepository } from '../../../User/v1/Repositories/UserCacheRepository.js'
import SleepEntryChanged from '../Events/SleepEntryChanged.js'
import { getMinutesFromTime } from '../Helpers/GetMinutesFromTime.js'
import { AverageSleepData } from '../Interfaces/Cache/AverageSleepData.js'
import { ISleepRepository } from '../Interfaces/Sleep/ISleepRepository.js'
import { SleepRepository } from '../Repositories/SleepRepository.js'

export default class CacheUserSleepDataFromDB {
  #userCacheRepository: IUserCacheRepository
  #sleepRepository: ISleepRepository

  constructor() {
    this.#userCacheRepository = new UserCacheRepository()
    this.#sleepRepository = new SleepRepository()
  }
  async handle(event: SleepEntryChanged) {
    const sleepEntry = event.sleepEntry

    const currentDate = DateTime.now()
    const weekStart = currentDate.startOf('week')
    const weekEnd = currentDate.endOf('week')
    const sleepEntryWeekStart = DateTime.fromISO(sleepEntry.start.toString()).startOf('week')

    if (sleepEntryWeekStart.toISODate() !== weekStart.toISODate()) {
      // We only care about changes to current week stats
      return
    }

    const entries = await this.#sleepRepository.findByThisWeek(currentDate.toISODate())

    let avgSleepDuration = 0
    let avgSleepStartTime = 0
    let avgSleepEndTime = 0
    let avgWakeupTimes = 0

    for (const entry of entries) {
      avgSleepDuration += entry.duration
      avgSleepStartTime += getMinutesFromTime(entry.start)
      avgSleepEndTime += getMinutesFromTime(entry.end)
      avgWakeupTimes += entry.wakeupTimes || 0
    }

    avgSleepDuration /= entries.length
    avgSleepStartTime /= entries.length
    avgSleepEndTime /= entries.length
    avgWakeupTimes /= entries.length

    const userSleepData: AverageSleepData = {
      meta: {
        weekStart: weekStart.toISODate(),
        weekEnd: weekEnd.toISODate(),
        inserts: entries.length,
      },
      data: {
        avgSleepDuration: avgSleepDuration,
        avgSleepStartTime: avgSleepStartTime,
        avgSleepEndTime: avgSleepEndTime,
        avgWakeupTimes: avgWakeupTimes,
      },
    }

    await this.#userCacheRepository.saveById({
      id: sleepEntry.userId,
      key: 'average_sleep',
      values: userSleepData,
    })
  }
}

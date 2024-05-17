import { DateTime } from 'luxon'
import { IUserCacheRepository } from '../../../User/v1/Interfaces/IUserCacheRepository.js'
import { UserCacheRepository } from '../../../User/v1/Repositories/UserCacheRepository.js'
import SleepEntryCreated from '../Events/SleepEntryCreated.js'
import { getMinutesFromTime } from '../Helpers/GetMinutesFromTime.js'
import { AverageSleepData } from '../Interfaces/Cache/AverageSleepData.js'
import { CalculateAverageSleepData } from '../Tasks/CalculateAverageSleepData.js'

export default class RecalculateUserSleepData {
  #userCacheRepository: IUserCacheRepository

  constructor() {
    this.#userCacheRepository = new UserCacheRepository()
  }
  async handle(event: SleepEntryCreated) {
    const sleepEntry = event.sleepEntry

    const currentDate = DateTime.now()
    const weekStart = currentDate.startOf('week')
    const weekEnd = currentDate.endOf('week')
    const sleepEntryWeekStart = DateTime.fromISO(sleepEntry.start.toString()).startOf('week')

    const savedAvgData = (await this.#userCacheRepository.findById({
      id: sleepEntry.userId,
      key: 'average_sleep',
    })) as AverageSleepData | null
    // Store entirely new avg data for this week if no previous avg data was found or if its a new week
    if (!savedAvgData || savedAvgData.meta.weekStart !== weekStart.toISODate()) {
      const userSleepData: AverageSleepData = {
        meta: {
          weekStart: weekStart.toISODate(),
          weekEnd: weekEnd.toISODate(),
          inserts: 1,
        },
        data: {
          avgSleepDuration: sleepEntry.duration,
          avgSleepStartTime: getMinutesFromTime(sleepEntry.start),
          avgSleepEndTime: getMinutesFromTime(sleepEntry.end),
          avgWakeupTimes: sleepEntry.wakeupTimes || 0,
        },
      }
      await this.#userCacheRepository.saveById({
        id: sleepEntry.userId,
        key: 'average_sleep',
        values: userSleepData,
      })
      return
    } else if (sleepEntryWeekStart.toISODate() === weekStart.toISODate()) {
      const recalculatedSleepData = new CalculateAverageSleepData().run({
        sleepEntry: sleepEntry,
        averageData: savedAvgData,
      })

      await this.#userCacheRepository.saveById({
        id: sleepEntry.userId,
        key: 'average_sleep',
        values: recalculatedSleepData,
      })
      return
    }

    // We intentionally do not want to handle averages from non-current week inserts
    console.log('Not handling these dates')
  }
}

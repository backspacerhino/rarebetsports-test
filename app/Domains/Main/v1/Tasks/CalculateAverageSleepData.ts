import IRunnable from '#domains/Ship/Interfaces/IRunnable'
import BaseTask from '#domains/Ship/Tasks/BaseTask'
import { getMinutesFromTime } from '../Helpers/GetMinutesFromTime.js'
import { AverageSleepData } from '../Interfaces/Cache/AverageSleepData.js'
import SleepEntry from '../Models/SleepEntry.js'

interface Data {
  sleepEntry: SleepEntry
  averageData: AverageSleepData
}

export class CalculateAverageSleepData extends BaseTask implements IRunnable {
  constructor() {
    super()
  }

  run(data: Data) {
    const newInserts = data.averageData.meta.inserts + 1
    const baseAvgSleepDuration =
      data.averageData.data.avgSleepDuration * data.averageData.meta.inserts
    const newAvgDuration = (baseAvgSleepDuration + data.sleepEntry.duration) / newInserts

    const baseAvgSleepStartTime =
      data.averageData.data.avgSleepStartTime * data.averageData.meta.inserts
    const newAvgSleepStartTime =
      (baseAvgSleepStartTime + getMinutesFromTime(data.sleepEntry.start)) / newInserts

    const baseAvgSleepEndTime =
      data.averageData.data.avgSleepEndTime * data.averageData.meta.inserts
    const newAvgSleepEndTime =
      (baseAvgSleepEndTime + getMinutesFromTime(data.sleepEntry.end)) / newInserts

    const baseAvgSleepWakeupTimes =
      data.averageData.data.avgWakeupTimes * data.averageData.meta.inserts
    const newAvgSleepWakeupTimes =
      (baseAvgSleepWakeupTimes + (data.sleepEntry.wakeupTimes || 0)) / newInserts

    const returnData = data.averageData
    returnData.meta.inserts = newInserts
    returnData.data = {
      avgSleepDuration: parseFloat(newAvgDuration.toFixed(2)),
      avgSleepStartTime: parseFloat(newAvgSleepStartTime.toFixed(2)),
      avgSleepEndTime: parseFloat(newAvgSleepEndTime.toFixed(2)),
      avgWakeupTimes: newAvgSleepWakeupTimes,
    }
    return returnData
  }
}

export interface AverageSleepData {
  meta: {
    weekStart: string
    weekEnd: string
    inserts: number
  }
  data: {
    avgSleepDuration: number
    avgSleepStartTime: number
    avgSleepEndTime: number
    avgWakeupTimes: number
  }
}

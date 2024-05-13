import { DateTime } from 'luxon'

export interface SleepEntryData {
  date: DateTime
  sleepStart: DateTime | number // TODO: Fix types
  sleepEnd: DateTime | number // TODO: Fix types
  sleepDuration: number
  wakeupTimes?: number
}

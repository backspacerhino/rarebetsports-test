export interface UpdateSleepEntryValidatorData {
  start?: Date
  end?: Date
  wakeup_times?: number
  params: {
    id: number
  }
}

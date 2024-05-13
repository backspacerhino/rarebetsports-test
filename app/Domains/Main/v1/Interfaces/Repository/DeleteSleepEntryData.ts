import User from '#domains/User/v1/Models/User'

export interface DeleteSleepEntryData {
  id: number
  authUser?: User
}

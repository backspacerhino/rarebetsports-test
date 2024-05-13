import User from '#domains/User/v1/Models/User'
import { ListSleepEntriesValidatorData } from '../Validators/ListSleepEntriesValidatorData.js'

export interface ListSleepEntryData {
  data: ListSleepEntriesValidatorData
  authUser: User
}

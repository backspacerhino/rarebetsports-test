import { BaseEvent } from '@adonisjs/core/events'
import SleepEntry from '../Models/SleepEntry.js'

export default class SleepEntryCreated extends BaseEvent {
  constructor(public sleepEntry: SleepEntry) {
    super()
  }
}

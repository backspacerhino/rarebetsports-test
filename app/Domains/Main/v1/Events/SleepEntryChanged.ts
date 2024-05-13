import { BaseEvent } from '@adonisjs/core/events'
import SleepEntry from '../Models/SleepEntry.js'

export default class SleepEntryChanged extends BaseEvent {
  constructor(public sleepEntry: SleepEntry) {
    super()
  }
}

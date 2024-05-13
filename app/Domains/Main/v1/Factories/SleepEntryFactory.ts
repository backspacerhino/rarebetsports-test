import { BaseFactory } from '#domains/Ship/Factories/BaseFactory'
import ICreateable from '#ship/Interfaces/ICreateable'
import { faker } from '@faker-js/faker/locale/en'
import { DateTime } from 'luxon'
import SleepEntry from '../Models/SleepEntry.js'

export default class SleepEntryFactory extends BaseFactory<SleepEntry> implements ICreateable {
  create(data?: Partial<SleepEntry>) {
    const recent = DateTime.fromJSDate(faker.date.recent())
    // TODO: Fix type
    const result: Partial<any> = {
      date: data?.date || DateTime.fromJSDate(faker.date.recent()).toISO(),
      start: data?.start || recent.toISO(),
      duration: data?.duration || faker.number.int({ max: 100 }),
      wakeupTimes: data?.wakeupTimes || faker.number.int({ max: 4 }),
      userId: data?.userId,
    }

    result.end = data?.end || recent.plus({ day: 1 }).toISO()

    if (data?.id) {
      result.id = data?.id
    }

    return result
  }
}

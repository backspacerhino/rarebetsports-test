import { Environments } from '#domains/Ship/Enums/Environments'
import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SleepEntryFactory from '../Factories/SleepEntryFactory.js'
import { SleepRepository } from '../Repositories/SleepRepository.js'

export default class SleepEntrySeeder extends BaseSeeder {
  static environment = [Environments.DEV]
  async run() {
    const user = await new UserRepository().model.query().firstOrFail()
    const entries = new SleepEntryFactory().createMultiple(20, { userId: user.id })
    await new SleepRepository().model.createMany(entries)
  }
}

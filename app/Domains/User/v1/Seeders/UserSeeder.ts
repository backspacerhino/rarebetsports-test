import { Environments } from '#domains/Ship/Enums/Environments'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserFactory from '../Factories/UserFactory.js'
import { UserRepository } from '../Repositories/UserRepository.js'

export default class UserSeeder extends BaseSeeder {
  static environment = [Environments.DEV]
  async run() {
    const users = new UserFactory().createMultiple(2)
    await new UserRepository().model.createMany(users)
  }
}

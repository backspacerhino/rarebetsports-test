import { BaseFactory } from '#domains/Ship/Factories/BaseFactory'
import ICreateable from '#ship/Interfaces/ICreateable'
import { faker } from '@faker-js/faker/locale/en'
import User from '../Models/User.js'

export default class UserFactory extends BaseFactory<User> implements ICreateable {
  create(data?: Partial<User>) {
    const result: Partial<User> = {
      email: data?.email || faker.internet.email(),
      password: data?.password || faker.internet.password(),
    }

    if (data?.id) {
      result.id = data?.id
    }

    return result
  }
}

import { exceptions } from '#domains/Ship/Exceptions/Exceptions'
import UserFactory from '#domains/User/v1/Factories/UserFactory'
import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import hash from '@adonisjs/core/services/hash'
import testUtils from '@adonisjs/core/services/test_utils'
import { faker } from '@faker-js/faker/locale/en'
import { test } from '@japa/runner'

test.group('Login user', (group) => {
  const url = 'api/v1/auth/login'

  const userRepository = new UserRepository()
  const userFactory = new UserFactory()

  group.each.setup(async () => {
    await testUtils.db().migrate()
    await testUtils.db().seed()
  })

  group.each.teardown(async () => {
    await testUtils.db().truncate()
  })

  test('login if valid data', async ({ assert, client }) => {
    const userMock = userFactory.create()
    await userRepository.model.create(userMock)
    const data: Record<string, string> = {
      email: userMock.email!,
      password: userMock.password!,
    }

    const response = await client.post(url).json(data)

    response.assertStatus(200)
    response.assertBodyContains({
      code: 0,
      data: {
        type: 'bearer',
        name: null,
        lastUsedAt: null,
        expiresAt: null,
      },
    })
    assert.exists(response.body().data.token)
    const userResource = await userRepository.findBy('email', data.email)
    assert.exists(userResource)
    assert.equal(userResource?.email, data.email)
    await hash.verify(userResource!.password, data.password)
  })
  test("don't login if missing data", async ({ client }) => {
    const userMock = userFactory.create()
    const data: Record<string, string> = {
      email: userMock.email!,
      password: userMock.password!,
    }

    let response = await client.post(url).json({
      password: data.password,
    })
    response.assertStatus(422)
    response.assertBody({
      code: exceptions['E_VALIDATION_ERROR'].internalCode,
      errors: [
        {
          message: `The email field must be defined`,
          rule: 'required',
          field: 'email',
        },
      ],
      message: 'Validation errors found.',
    })
    response = await client.post(url).json({
      email: data.email,
    })
    response.assertStatus(422)
    response.assertBody({
      code: exceptions['E_VALIDATION_ERROR'].internalCode,
      errors: [
        {
          message: `The password field must be defined`,
          rule: 'required',
          field: 'password',
        },
      ],
      message: 'Validation errors found.',
    })
  })

  test("don't login if invalid data", async ({ client }) => {
    const userMock = userFactory.create()
    const data: Record<string, string> = {
      email: userMock.email!,
      password: userMock.password!,
    }

    let response = await client.post(url).json({
      ...data,
      email: 'test',
    })
    response.assertStatus(422)
    response.assertBody({
      code: exceptions['E_VALIDATION_ERROR'].internalCode,
      errors: [
        {
          message: 'The email field must be a valid email address',
          rule: 'email',
          field: 'email',
        },
      ],
      message: 'Validation errors found.',
    })

    response = await client.post(url).json({
      ...data,
      password: 'test',
    })
    response.assertStatus(422)
    response.assertBody({
      code: exceptions['E_VALIDATION_ERROR'].internalCode,
      errors: [
        {
          message: 'The password field must have at least 6 characters',
          rule: 'minLength',
          field: 'password',
          meta: {
            min: 6,
          },
        },
      ],
      message: 'Validation errors found.',
    })
  })

  test("don't login if user doesn't exist", async ({ client }) => {
    const userMock = userFactory.create()
    const data: Record<string, string> = {
      email: faker.internet.email(),
      password: userMock.password!,
    }

    let response = await client.post(url).json(data)
    response.assertStatus(404)
    response.assertBody({
      code: 3,
      message: 'Resource not found.',
    })
  })

  test("don't login if invalid password", async ({ client }) => {
    const userMock = userFactory.create()
    await userRepository.model.create(userMock)
    const data: Record<string, string> = {
      email: userMock.email!,
      password: faker.internet.password(),
    }

    let response = await client.post(url).json(data)
    response.assertStatus(404)
    response.assertBody({
      code: 200,
      message: 'Resource not found or wrong credentials.',
    })
  })
})

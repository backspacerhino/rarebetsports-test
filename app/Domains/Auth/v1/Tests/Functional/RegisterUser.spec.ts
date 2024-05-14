import { exceptions } from '#domains/Ship/Exceptions/Exceptions'
import UserFactory from '#domains/User/v1/Factories/UserFactory'
import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import hash from '@adonisjs/core/services/hash'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Register user', (group) => {
  const url = 'api/v1/auth/register'

  const userRepository = new UserRepository()
  const userFactory = new UserFactory()

  group.each.setup(async () => {
    await testUtils.db().migrate()
    await testUtils.db().seed()
  })

  group.each.teardown(async () => {
    await testUtils.db().truncate()
  })

  test('register if valid data', async ({ assert, client }) => {
    const userMock = userFactory.create()
    const data: Record<string, string> = {
      email: userMock.email!,
      password: userMock.password!,
    }
    data.password_confirmation = data.password

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
  test("don't register if missing data", async ({ client }) => {
    const userMock = userFactory.create()
    const data: Record<string, string> = {
      email: userMock.email!,
      password: userMock.password!,
    }
    data.password_confirmation = data.password

    let response = await client.post(url).json({
      password: data.password,
      password_confirmation: data.password_confirmation,
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
      password_confirmation: data.password_confirmation,
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

    response = await client.post(url).json({
      email: data.email,
      password: data.password,
    })
    response.assertStatus(422)
    response.assertBody({
      code: exceptions['E_VALIDATION_ERROR'].internalCode,
      errors: [
        {
          message: 'The password field and password_confirmation field must be the same',
          rule: 'confirmed',
          field: 'password',
          meta: {
            otherField: 'password_confirmation',
          },
        },
      ],
      message: 'Validation errors found.',
    })
  })

  test("don't register if invalid data", async ({ client }) => {
    const userMock = userFactory.create()
    const data: Record<string, string> = {
      email: userMock.email!,
      password: userMock.password!,
    }
    data.password_confirmation = data.password

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

    response = await client.post(url).json({
      ...data,
      password_confirmation: 'test',
    })
    response.assertStatus(422)
    response.assertBody({
      code: exceptions['E_VALIDATION_ERROR'].internalCode,
      errors: [
        {
          message: 'The password field and password_confirmation field must be the same',
          rule: 'confirmed',
          field: 'password',
          meta: {
            otherField: 'password_confirmation',
          },
        },
      ],
      message: 'Validation errors found.',
    })
  })
})

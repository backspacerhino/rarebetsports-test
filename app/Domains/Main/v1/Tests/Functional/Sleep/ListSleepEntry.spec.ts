import SleepEntryFactory from '#domains/Main/v1/Factories/SleepEntryFactory'
import { SleepRepository } from '#domains/Main/v1/Repositories/SleepRepository'
import { exceptions } from '#domains/Ship/Exceptions/Exceptions'
import { loginInTest } from '#domains/Ship/Tests/Helpers/LoginInTest'
import UserFactory from '#domains/User/v1/Factories/UserFactory'
import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('List sleep entry', (group) => {
  const url = 'api/v1/sleep-entries'

  const sleepRepository = new SleepRepository()
  const userRepository = new UserRepository()
  const userFactory = new UserFactory()
  const sleepEntryFactory = new SleepEntryFactory()

  group.each.setup(async () => {
    await testUtils.db().migrate()
  })

  group.each.teardown(async () => {
    await testUtils.db().truncate()
  })

  test('list if no data(body)', async ({ assert, client }) => {
    const count = 5
    const userMock = userFactory.create()
    const userMockValid = userFactory.create()
    const user = await userRepository.model.create(userMock)
    const userValid = await userRepository.model.create(userMockValid)
    const sleepEntriesMock = sleepEntryFactory.createMultiple(10, { userId: user.id })
    const sleepEntriesMockValid = sleepEntryFactory.createMultiple(count, { userId: userValid.id })
    await sleepRepository.model.createMany([...sleepEntriesMock, ...sleepEntriesMockValid])

    const token = await loginInTest({
      client,
      data: { email: userMockValid.email!, password: userMockValid.password! },
    })

    const response = await client.get(url).headers({
      Authorization: `Bearer ${token}`,
    })

    response.assertStatus(200)
    const responseBody = response.body()
    assert.equal(responseBody.code, 0)
    assert.exists(responseBody.data)
    assert.equal(responseBody.data.length, count)
    assert.exists(responseBody.data[0].id)
    assert.exists(responseBody.data[0].userId)
    assert.equal(responseBody.data[0].userId, userValid.id)
    assert.exists(responseBody.data[0].date)
    assert.exists(responseBody.data[0].start)
    assert.exists(responseBody.data[0].end)
    assert.exists(responseBody.data[0].duration)
    assert.exists(responseBody.data[0].wakeupTimes)
  })

  test('list if valid data', async ({ assert, client }) => {
    const count = 2
    const duration = 255

    const userMock = userFactory.create()
    const user = await userRepository.model.create(userMock)
    const sleepEntriesMock = sleepEntryFactory.createMultiple(5, {
      userId: user.id,
      duration: 1000,
    })

    const sleepEntryMockValid = sleepEntryFactory.createMultiple(count, {
      userId: user.id,
      duration,
    })

    await sleepRepository.model.createMany([...sleepEntriesMock, ...sleepEntryMockValid])

    const token = await loginInTest({
      client,
      data: { email: userMock.email!, password: userMock.password! },
    })

    const response = await client
      .get(url)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .qs({
        maximum_duration: duration,
      })

    response.assertStatus(200)
    const responseBody = response.body()
    assert.equal(responseBody.code, 0)
    assert.exists(responseBody.data)
    assert.equal(responseBody.data.length, count)
    assert.equal(responseBody.data[0].duration, duration)
  })

  test("don't list if invalid data", async ({ client }) => {
    const userMock = userFactory.create()
    await userRepository.model.create(userMock)

    const token = await loginInTest({
      client,
      data: { email: userMock.email!, password: userMock.password! },
    })

    const response = await client
      .get(url)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .qs({
        maximum_duration: 'test',
      })

    response.assertStatus(422)
    response.assertStatus(422)
    response.assertBody({
      code: exceptions['E_VALIDATION_ERROR'].internalCode,
      errors: [
        {
          message: 'The maximum_duration field must be a number',
          rule: 'number',
          field: 'maximum_duration',
        },
      ],
      message: 'Validation errors found.',
    })
  })

  test("don't list if unauthorized", async ({ client }) => {
    const userMock = userFactory.create()
    await userRepository.model.create(userMock)
    const response = await client.get(url)

    response.assertStatus(401)
    response.assertBody({
      code: exceptions['E_UNAUTHORIZED_ACCESS'].internalCode,

      message: 'Unauthorized access.',
    })
  })
})

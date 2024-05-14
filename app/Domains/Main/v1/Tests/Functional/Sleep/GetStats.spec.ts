import { getMinutesFromTime } from '#domains/Main/v1/Helpers/GetMinutesFromTime'
import { exceptions } from '#domains/Ship/Exceptions/Exceptions'
import { delay } from '#domains/Ship/Tests/Helpers/Delay'
import { loginInTest } from '#domains/Ship/Tests/Helpers/LoginInTest'
import UserFactory from '#domains/User/v1/Factories/UserFactory'
import { UserRepository } from '#domains/User/v1/Repositories/UserRepository'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Get stats', (group) => {
  const url = 'api/v1/stats'

  const userRepository = new UserRepository()
  const userFactory = new UserFactory()

  group.each.setup(async () => {
    await testUtils.db().migrate()
  })

  group.each.teardown(async () => {
    await testUtils.db().truncate()
  })

  test('get empty if no cache', async ({ client }) => {
    const userMock = userFactory.create()
    await userRepository.model.create(userMock)

    const token = await loginInTest({
      client,
      data: { email: userMock.email!, password: userMock.password! },
    })

    const response = await client.get(url).headers({
      Authorization: `Bearer ${token}`,
    })

    response.assertStatus(200)
    response.assertBody({
      code: 0,
      data: null,
    })
  })

  test('get stats if cache', async ({ client }) => {
    const userMock = userFactory.create()
    await userRepository.model.create(userMock)

    const token = await loginInTest({
      client,
      data: { email: userMock.email!, password: userMock.password! },
    })

    const start = DateTime.now().set({ hour: 1 })
    const end = DateTime.now().set({ hour: 10 })

    await client
      .post('api/v1/sleep-entries')
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .json({
        start: start.toFormat('yyyy-MM-dd HH:mm:ss'),
        end: end.toFormat('yyyy-MM-dd HH:mm:ss'),
      })

    await delay(10)

    const response = await client.get(url).headers({
      Authorization: `Bearer ${token}`,
    })

    const currentDate = DateTime.now()
    const weekStart = currentDate.startOf('week').toISODate()
    const weekEnd = currentDate.endOf('week').toISODate()

    const diff = end.diff(start, ['minutes'])

    response.assertStatus(200)
    response.assertBody({
      code: 0,
      data: {
        meta: {
          weekStart: weekStart,
          weekEnd: weekEnd,
          inserts: 1,
        },
        data: {
          avgSleepDuration: Math.round(diff.minutes),
          avgSleepStartTime: getMinutesFromTime(start),
          avgSleepEndTime: getMinutesFromTime(end),
          avgWakeupTimes: 0,
        },
      },
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

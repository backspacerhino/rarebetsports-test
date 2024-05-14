import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import SleepEntryController from '../Controllers/SleepEntryController.js'
import StatsController from '../Controllers/StatsController.js'

router
  .group(() => {
    router.group(() => {
      router.resource('sleep-entries', SleepEntryController).as('sleep_entries')
    })

    router.group(() => {
      router.get('stats', [StatsController, 'getStats']).as('stats')
    })
  })
  .prefix('api/v1')
  .use(middleware.auth())
  .as('api.v1')

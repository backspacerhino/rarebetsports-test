import router from '@adonisjs/core/services/router'
import UserController from '../Controllers/UserController.js'

router
  .group(() => {
    router.group(() => {
      router.resource('users', UserController) // TODO: Change this to auth endpoint
    })
  })
  .prefix('api/v1')
  .as('api.v1')

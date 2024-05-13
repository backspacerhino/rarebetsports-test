import router from '@adonisjs/core/services/router'
import AuthController from '../Controllers/AuthController.js'

router
  .group(() => {
    router.group(() => {
      router.post('login', [AuthController, 'login']).as('login')
      router.post('register', [AuthController, 'register']).as('register')
    })
  })
  .prefix('api/v1/auth')
  .as('api.v1.auth')

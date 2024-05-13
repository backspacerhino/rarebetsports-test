import { HttpContext } from '@adonisjs/core/http'
import { LoginUserAction } from '../Actions/LoginUserAction.js'
import { RegisterUserAction } from '../Actions/RegisterUserAction.js'
import { AuthTokenTransformer } from '../Transformers/Json/AuthTokenTransformer.js'
import { LoginUserValidator } from '../Validators/LoginUserValidator.js'
import { RegisterUserValidator } from '../Validators/RegisterUserValidator.js'

export default class AuthController {
  async register(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(RegisterUserValidator)
    const result = await new RegisterUserAction().run(data)
    return new AuthTokenTransformer().transform(result)
  }

  async login(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(LoginUserValidator)
    const result = await new LoginUserAction().run(data)
    return new AuthTokenTransformer().transform(result)
  }
}

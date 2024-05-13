import { BaseTransformer } from '#domains/Ship/Transformers/BaseTransformer'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export class AuthTokenTransformer extends BaseTransformer {
  transform(data: AccessToken) {
    return super._transform({ payload: data })
  }
}

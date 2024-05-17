import { ITransformable } from '#domains/Ship/Interfaces/ITransformable'
import { BaseTransformer } from '#domains/Ship/Transformers/BaseTransformer'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export class AuthTokenTransformer extends BaseTransformer implements ITransformable {
  transform(data: AccessToken) {
    return super._transform({ payload: data })
  }
}

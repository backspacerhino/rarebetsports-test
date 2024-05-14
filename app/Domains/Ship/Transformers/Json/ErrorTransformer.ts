import { CustomException } from '#domains/Ship/Interfaces/CustomException'
import { ITransformable } from '#domains/Ship/Interfaces/ITransformable'
import { BaseTransformer } from '../BaseTransformer.js'

export default class ErrorTransformer extends BaseTransformer implements ITransformable {
  transform(data: CustomException) {
    const error: any = {
      code: data.internalCode,
    }

    if (data.errors) {
      error.errors = data.errors
    }

    if (data.message) {
      error.message = data.message
    }

    return super._transform({
      code: error.code,
      message: error.message,
      errors: error.errors,
      payload: null,
    })
  }
}

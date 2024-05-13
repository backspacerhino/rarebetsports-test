import { ITransformable } from '#domains/Ship/Interfaces/ITransformable'
import { BaseTransformer } from '#domains/Ship/Transformers/BaseTransformer'

export default class DeleteTransformer extends BaseTransformer implements ITransformable {
  transform() {
    return super._transform({
      payload: null,
      message: 'Successfully deleted.',
    })
  }
}

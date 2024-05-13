import SleepEntry from '#domains/Main/v1/Models/SleepEntry'
import { ITransformable } from '#domains/Ship/Interfaces/ITransformable'
import { BaseTransformer } from '#domains/Ship/Transformers/BaseTransformer'

export class GetSleepEntryTransformer extends BaseTransformer implements ITransformable {
  transform(data: SleepEntry) {
    return super._transform({
      payload: data,
    })
  }
}

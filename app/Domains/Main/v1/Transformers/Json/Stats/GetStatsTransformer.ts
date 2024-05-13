import { AverageSleepData } from '#domains/Main/v1/Interfaces/Cache/AverageSleepData'
import { ITransformable } from '#domains/Ship/Interfaces/ITransformable'
import { BaseTransformer } from '#domains/Ship/Transformers/BaseTransformer'

export class GetStatsTransformer extends BaseTransformer implements ITransformable {
  transform(data: AverageSleepData | null) {
    return super._transform({
      payload: data,
    })
  }
}

import SleepEntry from '#domains/Main/v1/Models/SleepEntry'
import { ITransformable } from '#domains/Ship/Interfaces/ITransformable'
import { BaseTransformer } from '#domains/Ship/Transformers/BaseTransformer'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class ListSleepEntriesTransformer extends BaseTransformer implements ITransformable {
  transform(data: ModelPaginatorContract<SleepEntry>) {
    const jsonData = data.toJSON()
    return super._transform({
      meta: jsonData.meta,
      payload: jsonData.data,
    })
  }
}

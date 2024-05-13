import DeleteTransformer from '#domains/Ship/Transformers/Json/DeleteTransformer'
import { GetByIdValidator } from '#domains/Ship/Validators/GetByIdValidator'
import { HttpContext } from '@adonisjs/core/http'
import { CreateSleepEntryAction } from '../Actions/Sleep/CreateSleepEntryAction.js'
import { DeleteSleepEntryAction } from '../Actions/Sleep/DeleteSleepEntryAction.js'
import { GetSleepEntryAction } from '../Actions/Sleep/GetSleepEntryAction.js'
import { ListSleepEntriesAction } from '../Actions/Sleep/ListSleepEntriesAction.js'
import { UpdateSleepEntryAction } from '../Actions/Sleep/UpdateSleepEntryAction.js'
import { CreateSleepEntryTransformer } from '../Transformers/Json/Sleep/CreateSleepEntryTransformer.js'
import { GetSleepEntryTransformer } from '../Transformers/Json/Sleep/GetSleepJsonTransformer.js'
import { ListSleepEntriesTransformer } from '../Transformers/Json/Sleep/ListSleepEntriesTransformer.js'
import { UpdateSleepEntryTransformer } from '../Transformers/Json/Sleep/UpdateSleepEntryTransformer.js'
import { CreateSleepEntryValidator } from '../Validators/Sleep/CreateSleepEntryValidator.js'
import { DeleteSleepEntryValidator } from '../Validators/Sleep/DeleteSleepEntryValidator.js'
import { ListSleepEntriesValidator } from '../Validators/Sleep/ListSleepEntriesValidator.js'
import { UpdateSleepEntryValidator } from '../Validators/Sleep/UpdateSleepValidator.js'

export default class SleepEntryController {
  async index(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(ListSleepEntriesValidator)
    const result = await new ListSleepEntriesAction().run(data)
    return new ListSleepEntriesTransformer().transform(result)
  }

  async store(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(CreateSleepEntryValidator)
    const result = await new CreateSleepEntryAction().run(data)
    return new CreateSleepEntryTransformer().transform(result)
  }

  async show(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(GetByIdValidator)
    const result = await new GetSleepEntryAction().run({ id: data.params.id })
    return new GetSleepEntryTransformer().transform(result)
  }

  async update(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(UpdateSleepEntryValidator)
    const result = await new UpdateSleepEntryAction().run(data)
    return new UpdateSleepEntryTransformer().transform(result)
  }

  async destroy(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(DeleteSleepEntryValidator)
    await new DeleteSleepEntryAction().run(data.params)
    return new DeleteTransformer().transform()
  }
}

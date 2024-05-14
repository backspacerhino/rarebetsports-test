import { BaseRepository } from '#domains/Ship/Repositories/BaseRepository'
import { DeleteSleepEntryData } from '../Interfaces/Repository/DeleteSleepEntryData.js'
import { ListSleepEntryData } from '../Interfaces/Repository/ListSleepEntryData.js'
import { ISleepRepository } from '../Interfaces/Sleep/ISleepRepository.js'
import SleepEntry from '../Models/SleepEntry.js'

export class SleepRepository extends BaseRepository<typeof SleepEntry> implements ISleepRepository {
  constructor() {
    super(SleepEntry)
  }

  public async list(data: ListSleepEntryData) {
    let query = SleepEntry.query()
    if (data.data.minimum_duration) {
      query = query.where('duration', '>=', data.data.minimum_duration)
    }

    if (data.data.maximum_duration) {
      query = query.where('duration', '<=', data.data.maximum_duration)
    }

    query = query.where('user_id', data.authUser.id)
    return query.paginate(this.page, this.size)
  }

  public async findByThisWeek(date: string) {
    return await SleepEntry.query().where('start', '>', date)
  }

  async deleteByIdOrFail(data: DeleteSleepEntryData): Promise<SleepEntry> {
    let query = this._model.query().where('id', data.id)

    if (data.authUser) {
      query = query.where('user_id', data.authUser.id)
    }

    const result = await query.firstOrFail()
    await result.delete()
    return result
  }

  public async create(data: SleepEntry) {
    return await SleepEntry.create(data)
  }
}

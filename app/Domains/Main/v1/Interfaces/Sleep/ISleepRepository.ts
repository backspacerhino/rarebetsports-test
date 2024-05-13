import { IBaseRepository } from '#domains/Ship/Interfaces/IBaseRepository'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import SleepEntry from '../../Models/SleepEntry.js'
import { DeleteSleepEntryData } from '../Repository/DeleteSleepEntryData.js'
import { ListSleepEntryData } from '../Repository/ListSleepEntryData.js'

export interface ISleepRepository extends IBaseRepository<SleepEntry> {
  list(data: ListSleepEntryData): Promise<ModelPaginatorContract<SleepEntry>>
  findByThisWeek(date: string): Promise<SleepEntry[]>
  create(data: SleepEntry): Promise<SleepEntry>
  deleteByIdOrFail(data: DeleteSleepEntryData): Promise<SleepEntry>
}

import User from '#domains/User/v1/Models/User'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class SleepEntry extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare date: DateTime

  @column.dateTime()
  declare start: DateTime

  @column.dateTime()
  declare end: DateTime

  @column()
  declare duration: number // in minutes

  @column()
  declare wakeupTimes: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

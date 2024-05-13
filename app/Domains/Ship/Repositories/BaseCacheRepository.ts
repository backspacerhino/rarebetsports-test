import { LucidModel } from '@adonisjs/lucid/types/model'
import redis from '@adonisjs/redis/services/main'
import { CacheGetData } from '../Interfaces/Cache/CacheGetData.js'
import { CacheSaveData } from '../Interfaces/Cache/CacheSaveData.js'
import { IBaseCacheRepository } from '../Interfaces/IBaseCacheRepository.js'

export default abstract class BaseCacheRepository<T extends LucidModel>
  implements IBaseCacheRepository
{
  protected _model: T

  constructor(model: T) {
    this._model = model
  }

  async saveById(data: CacheSaveData) {
    await redis.hset(`${this._model.table}:${data.id}`, `${data.key}`, JSON.stringify(data.values))
  }

  async findById(data: CacheGetData) {
    const result = await redis.hget(`${this._model.table}:${data.id}`, `${data.key}`)
    return JSON.parse(result!)
  }

  async deleteById(id: number) {
    return await redis.hdel(this._model.table, `${id}`)
  }
}

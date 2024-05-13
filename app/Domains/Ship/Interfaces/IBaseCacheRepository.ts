import { CacheGetData } from './Cache/CacheGetData.js'
import { CacheSaveData } from './Cache/CacheSaveData.js'

export interface IBaseCacheRepository {
  saveById(data: CacheSaveData): Promise<void>
  findById(data: CacheGetData): Promise<Record<string, any> | null>
  deleteById(id: number): Promise<number>
}

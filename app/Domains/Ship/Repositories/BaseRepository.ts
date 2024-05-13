import { LucidModel } from '@adonisjs/lucid/types/model'
import { IBaseRepository } from '../Interfaces/IBaseRepository.js'

export abstract class BaseRepository<T extends LucidModel>
  implements IBaseRepository<InstanceType<T>>
{
  protected _model: T
  protected _page: number = 1
  protected _size: number = 50

  constructor(model: T) {
    this._model = model
  }

  get model() {
    return this._model
  }

  get page() {
    return this._page
  }

  set page(page: number) {
    if (!page) {
      page = 1
    }
    if (page < 1) {
      page = 1
    }
    this._page = page
  }

  get size() {
    return this._size
  }

  set size(size: number | undefined) {
    if (!size) {
      size = 50
    }
    if (size < 0) {
      size = 0
    } else if (size > 200) {
      size = 200
    }
    this._size = size
  }

  async findBy(key: string, value: any) {
    return await this._model.query().where(key, value).first()
  }

  async findByOrFail(key: string, value: any) {
    return await this._model.query().where(key, value).firstOrFail()
  }
}

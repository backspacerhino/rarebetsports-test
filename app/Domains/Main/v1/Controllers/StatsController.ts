import { HttpContext } from '@adonisjs/core/http'
import { GetStatsAction } from '../Actions/Stats/GetStatsAction.js'
import { GetStatsTransformer } from '../Transformers/Json/Stats/GetStatsTransformer.js'

export default class StatsController {
  async getStats(_ctx: HttpContext) {
    const result = await new GetStatsAction().run()
    console.log('RES', result)
    return new GetStatsTransformer().transform(result)
  }
}

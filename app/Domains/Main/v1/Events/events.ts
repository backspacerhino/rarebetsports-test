import emitter from '@adonisjs/core/services/emitter'
import SleepEntryChanged from './SleepEntryChanged.js'
import SleepEntryCreated from './SleepEntryCreated.js'

const RecalculateUserSleepData = () => import('#domains/Main/v1/Listeners/RecalculateUserSleepData')
const CacheUserSleepDataFromDB = () => import('#domains/Main/v1/Listeners/CacheUserSleepDataFromDB')

emitter.on(SleepEntryCreated, [RecalculateUserSleepData])
emitter.on(SleepEntryChanged, [CacheUserSleepDataFromDB])

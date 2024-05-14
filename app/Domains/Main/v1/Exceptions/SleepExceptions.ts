import { CustomException } from '#domains/Ship/Interfaces/CustomException'
import { SleepExceptions } from '../Interfaces/SleepExceptionType.js'

// Sleep errors are 300-499
export const sleepExceptions: Record<SleepExceptions, CustomException> = {
  START_LATER_THAN_END: {
    internalCode: 300,
    statusCode: 422,
    message: "Sleep start can't be later than sleep end.",
  },
  MIN_DURATION_GREATER_THAN_MAX_DURATION: {
    internalCode: 301,
    statusCode: 422,
    message: "minimum_duration can't be bigger than maximum_duration.",
  },
}

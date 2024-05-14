import GeneralError from '#domains/Ship/Exceptions/GeneralError'
import { DateTime } from 'luxon'

export function getMinutesFromTime(time: DateTime) {
  const sanitizedData = DateTime.fromISO(time.toString()).toISOTime()
  if (!sanitizedData) {
    throw new GeneralError('ISO_TIME_ERROR')
  }
  const [hours, minutes] = sanitizedData.split(':').map(Number)
  return hours * 60 + minutes
}

import { DateTime } from 'luxon'

export function getMinutesFromTime(time: DateTime) {
  const sanitizedData = DateTime.fromISO(time.toString()).toISOTime()
  if (!sanitizedData) {
    throw new Error('ISO Time doesn exist') // TODO: Create proper error
  }
  const [hours, minutes] = sanitizedData.split(':').map(Number)
  return hours * 60 + minutes
}

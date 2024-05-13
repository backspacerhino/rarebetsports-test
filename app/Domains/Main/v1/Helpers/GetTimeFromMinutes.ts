import { DateTime } from 'luxon'

export function getTimeFromMinutes(minutes: number) {
  const midnight = DateTime.local().startOf('day')
  const time = midnight.plus({ minutes })
  return time.toFormat('HH:mm')
}

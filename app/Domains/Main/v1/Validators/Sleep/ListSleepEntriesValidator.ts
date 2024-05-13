import vine from '@vinejs/vine'

export const ListSleepEntriesValidator = vine.compile(
  vine.object({
    minimum_duration: vine.number().positive().optional(),
    maximum_duration: vine.number().positive().optional(),
  })
)

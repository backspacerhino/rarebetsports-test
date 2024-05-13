import vine from '@vinejs/vine'

export const DeleteSleepEntryValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)

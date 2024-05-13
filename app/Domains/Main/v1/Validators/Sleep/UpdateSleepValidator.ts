import vine from '@vinejs/vine'

export const UpdateSleepEntryValidator = vine.compile(
  vine.object({
    start: vine.date().beforeOrEqual('today').optional(),
    end: vine.date().beforeOrEqual('today').optional(),
    wakeup_times: vine.number().min(0).optional(),
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

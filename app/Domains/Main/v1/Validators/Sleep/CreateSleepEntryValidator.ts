import vine from '@vinejs/vine'

export const CreateSleepEntryValidator = vine.compile(
  vine.object({
    start: vine.date().beforeOrEqual('today'),
    end: vine.date().beforeOrEqual('today'),
    wakeup_times: vine.number().min(0).optional(),
  })
)

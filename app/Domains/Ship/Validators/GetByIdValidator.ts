import vine from '@vinejs/vine'

export const GetByIdValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

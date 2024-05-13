import vine from '@vinejs/vine'

export const RegisterUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().confirmed(),
  })
)

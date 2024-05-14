export interface CustomException {
  internalCode: number
  statusCode: number
  message: null | string
  errors?: AdonisError[]
}

interface AdonisError {
  rule: string
  field: string
  message: string
}

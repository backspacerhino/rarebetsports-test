import { VineObject, VineValidator } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export interface IValidateable {
  schema(): VineObject<any, any, any, any>
  compile(): Infer<VineValidator<any, any>>
}

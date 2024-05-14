import { ITransformable } from '../Interfaces/ITransformable.js'

interface TransformableData {
  code?: number
  meta?: Record<string, any>
  payload: Record<string, any> | null
  errors?: Record<string, any>
  message?: string
}

export abstract class BaseTransformer implements ITransformable {
  _transform(data: TransformableData) {
    const code = (data.code ??= 0)
    const result: Partial<TransformableData> & { data?: Record<string, any> } = {
      code,
    }

    if (data.payload) {
      result.data = data.payload
    }

    if (data.meta) {
      result.meta = data.meta
    }

    if (data.errors) {
      result.errors = data.errors
    }

    if (data.message) {
      result.message = data.message
    }

    return result
  }
}

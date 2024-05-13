import { ITransformable } from '../Interfaces/ITransformable.js'

interface TransformableData {
  code?: number
  meta?: Record<string, any>
  payload: Record<string, any> | null
  message?: string
}

export abstract class BaseTransformer implements ITransformable {
  _transform(data: TransformableData) {
    const code = (data.code ??= 0)
    const result: Partial<TransformableData> & { data: Record<string, any> } = {
      code,
      data: data.payload,
    }

    if (data.meta) {
      result.meta = data.meta
    }

    if (data.message) {
      result.message = data.message
    }

    return result
  }
}

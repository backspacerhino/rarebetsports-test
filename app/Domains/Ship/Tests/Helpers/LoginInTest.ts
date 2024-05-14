import { ApiClient } from '@japa/api-client'

interface Data {
  client: ApiClient
  data: {
    email: string
    password: string
  }
}

export async function loginInTest(data: Data) {
  const response = await data.client.post(`api/v1/auth/login`).json(data.data)
  const body = response.body()
  return body.data.token
}

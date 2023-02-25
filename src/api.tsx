import PocketBase from 'pocketbase'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Collections } from './pocketbase-types'

export const client = new PocketBase('http://127.0.0.1:8090')
export const queryClient = new QueryClient()

// export async function allUsers() {
//  s const users = await client.collection(Collections.Users).
//   return users
// }

export function Auth() {
  const mutation = useMutation({
    mutationFn: authPb,
  })

  return <button onClick={() => mutation.mutate()}></button>
}

export async function authPb() {
  return client
    .collection(Collections.Users)
    .authWithPassword('test', 'testtest')
}
// console.log(client.authStore.isValid)
// console.log(client.authStore.token)
// console.log(client.authStore.model?.id)

// client.authStore.clear()

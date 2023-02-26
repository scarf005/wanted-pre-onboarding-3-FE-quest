import PocketBase from 'pocketbase'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Collections } from './pocketbase-types'

export const pb = new PocketBase('http://127.0.0.1:8090')
export const queryClient = new QueryClient()

export async function authPb() {
  return pb.collection(Collections.Users).authWithPassword('test', '12345678')
}

export function isLoggedIn() {
  return pb.authStore.isValid
}

export async function logoutPb() {
  pb.authStore.clear()
}

// ;<button
//   onClick={() => {
//     console.log(pb.authStore.isValid)
//     console.log(pb.authStore.token)
//     console.log(pb.authStore.model?.id)
//   }}
// >
//   Show status
// </button>

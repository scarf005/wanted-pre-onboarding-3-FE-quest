import { useMutation } from '@tanstack/react-query'
import { Outlet, Link, Router, Route, RootRoute } from '@tanstack/react-router'
import { authPb, pb } from './api'

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
})
function Root() {
  return (
    <>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/posts/a'>a</Link>
        <Link to='/posts/b'>b</Link>
        <Link to='/posts/c'>c</Link>
        <Link to='/auth'>Login</Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
}
const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'posts',
  component: AuthenticatedLayout,
})
function AuthenticatedLayout() {
  return (
    <>
      <h3>You are logged in!</h3>
      <button
        onClick={() => {
          console.log(pb.authStore.isValid)
          console.log(pb.authStore.token)
          console.log(pb.authStore.model?.id)

          // pb.authStore.clear()
        }}
      >
        Show status
      </button>
      <Outlet />
    </>
  )
}
// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})
function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  )
}
const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth,
})

export function Auth() {
  const mutation = useMutation({
    mutationFn: authPb,
  })

  return <button onClick={() => mutation.mutate()}>Login</button>
}

const aRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/a',
  component: A,
})
const bRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/b',
  component: B,
})
const cRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/c',
  component: C,
})
function A() {
  return <div>Page A</div>
}
function B() {
  return <div>Page B</div>
}
function C() {
  return <div>Page C</div>
}
const protectedRouteTree = protectedRoute.addChildren([aRoute, bRoute, cRoute])
// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  protectedRouteTree,
])
// Create the router using your route tree
export const router = new Router({ routeTree })
// Register your router for maximum type safety

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

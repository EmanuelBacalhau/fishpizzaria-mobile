import AuthRoutes from './AuthRoutes'
import NoAuthRoutes from './NoAuthRoutes'

export default function Routes() {
  const isAuthenticated = false
  const loading = false

  return isAuthenticated ? <AuthRoutes /> : <NoAuthRoutes/>
}
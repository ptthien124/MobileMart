import { memo, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PRIVATE_ROUTES } from '../../router'
import Dashboard from './page'

const DASHBOARD_ROUTES = PRIVATE_ROUTES.DASHBOARD

const BaseDashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense>
            <Outlet />
          </Suspense>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path='*' element={<Navigate to={DASHBOARD_ROUTES.ROOT} />} />
      </Route>
    </Routes>
  )
}

const DashboardRoutes = memo(BaseDashboardRoutes)

export default DashboardRoutes

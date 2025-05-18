import { lazy, memo, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout'

/* -------------------------------------------------------------------------- */
/*                               Defined routes                               */
/* -------------------------------------------------------------------------- */

export const PUBLIC_ROUTES = {
  SIGN_IN: 'sign-in'
}

export const PRIVATE_ROUTES = {
  DASHBOARD: { ROOT: '/dashboard' }
}

/* ----------------------------- Defined routes ----------------------------- */

//
//
//

/* -------------------------------------------------------------------------- */
/*                           Lazy import components                           */
/* -------------------------------------------------------------------------- */

const DashboardRoutes = lazy(() => import('../pages/dashboard/index.routes'))

/* ------------------------- Lazy import components ------------------------- */

const BaseAppRouter = () => {
  const privatesRoutes = {
    dashboard: {
      element: DashboardRoutes,
      path: PRIVATE_ROUTES.DASHBOARD.ROOT
    }
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <Suspense>
              <Outlet />
            </Suspense>
          </Layout>
        }
      >
        <Route index element={<Navigate to={PRIVATE_ROUTES.DASHBOARD.ROOT} />} />

        {Object.keys(privatesRoutes).map((key) => {
          const route = privatesRoutes[key as keyof typeof privatesRoutes]
          const { path, element: Element } = route
          return <Route key={key} path={path + '/*'} element={<Element />} />
        })}

        <Route path='*' element={<Navigate to={PRIVATE_ROUTES.DASHBOARD.ROOT} />} />
      </Route>
    </Routes>
  )
}

const AppRouter = memo(BaseAppRouter)

export default AppRouter

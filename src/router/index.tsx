import { lazy, memo, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import PrivateRoute from '../components/private-route';
import { PRIVATE_ROUTES } from '../constants/route';

//
//
//

/* -------------------------------------------------------------------------- */
/*                           Lazy import components                           */
/* -------------------------------------------------------------------------- */

const DashboardRoutes = lazy(() => import('../pages/dashboard/index.routes'));
const ModuleRoutes = lazy(() => import('../pages/module/index.routes'));
const ManagementRoutes = lazy(() => import('../pages/management/index.routes'));

/* ------------------------- Lazy import components ------------------------- */

const privatesRoutes: Record<string, any> = {
  management: {
    element: ManagementRoutes,
    path: PRIVATE_ROUTES.MANAGEMENT.ROOT,
    requiredAdmin: true
  }
};

const publicRoutes: Record<string, any> = {
  dashboard: {
    element: DashboardRoutes,
    path: PRIVATE_ROUTES.DASHBOARD.ROOT
  },
  module: {
    element: ModuleRoutes,
    path: PRIVATE_ROUTES.MODULE.ROOT
  }
};

const BaseAppRouter = () => {
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
        {Object.keys(publicRoutes).map((key) => {
          const route = publicRoutes[key as keyof typeof publicRoutes];
          const { path, element: Element } = route;
          return <Route key={key} path={path + '/*'} element={<Element />} />;
        })}

        <Route
          path='/'
          element={
            <PrivateRoute>
              <Suspense>
                <Outlet />
              </Suspense>
            </PrivateRoute>
          }
        >
          {Object.keys(privatesRoutes).map((key) => {
            const route = privatesRoutes[key as keyof typeof privatesRoutes];
            const { path, element: Element } = route;

            return <Route key={key} path={path + '/*'} element={<Element />} />;
          })}
        </Route>

        <Route path='*' element={<Navigate to={PRIVATE_ROUTES.DASHBOARD.ROOT} />} />
      </Route>
    </Routes>
  );
};

const AppRouter = memo(BaseAppRouter);

export default AppRouter;

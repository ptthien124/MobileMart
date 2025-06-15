import { memo, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Management from './page';
import { PRIVATE_ROUTES } from '../../contants/route';

const MANAGEMENT_ROUTES = PRIVATE_ROUTES.MANAGEMENT;

const BaseManagementRoutes = () => {
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
        <Route index element={<Management />} />

        <Route path='*' element={<Navigate to={MANAGEMENT_ROUTES.ROOT} />} />
      </Route>
    </Routes>
  );
};

const ManagementRoutes = memo(BaseManagementRoutes);

export default ManagementRoutes;

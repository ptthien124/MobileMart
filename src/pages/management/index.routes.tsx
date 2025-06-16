import { memo, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Management from './page';
import { PRIVATE_ROUTES } from '../../constants/route';
import useAuthentication from '../../hooks/useAuthentication';
import { Role } from '../../types/user.type';

const MANAGEMENT_ROUTES = PRIVATE_ROUTES.MANAGEMENT;

const BaseManagementRoutes = () => {
  const { user } = useAuthentication();

  const isAdmin = user?.role === Role.ADMIN;

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
        {isAdmin && <Route index element={<Management />} />}

        <Route path='*' element={<Navigate to={MANAGEMENT_ROUTES.ROOT} />} />
      </Route>
    </Routes>
  );
};

const ManagementRoutes = memo(BaseManagementRoutes);

export default ManagementRoutes;

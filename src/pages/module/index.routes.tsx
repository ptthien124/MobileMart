import { memo, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ModuleDetail from './page/module.detail';
import ModuleManagement from './page/module.management';
import { PRIVATE_ROUTES } from '../../constants/route';

const MODULE_ROUTES = PRIVATE_ROUTES.MODULE;

const BaseModuleRoutes = () => {
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
        <Route index element={<ModuleManagement />} />

        <Route path=':id' element={<ModuleDetail />} />

        <Route path='*' element={<Navigate to={MODULE_ROUTES.ROOT} />} />
      </Route>
    </Routes>
  );
};

const ModuleRoutes = memo(BaseModuleRoutes);

export default ModuleRoutes;

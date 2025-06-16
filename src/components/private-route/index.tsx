import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '../../constants/route';
import useAuthentication from '../../hooks/useAuthentication';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuthentication();

  if (!user) {
    return <Navigate to={PRIVATE_ROUTES.DASHBOARD.ROOT} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

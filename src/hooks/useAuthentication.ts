import { useGetUserById } from '../queries/user.query';

const useAuthentication = () => {
  const userLocal = JSON.parse(localStorage.getItem('user') || '{}');

  const { data } = useGetUserById({ id: userLocal?.id, options: { enabled: !!userLocal?.id } });

  return { isSignedIn: !!data?.data, user: data?.data };
};

export default useAuthentication;

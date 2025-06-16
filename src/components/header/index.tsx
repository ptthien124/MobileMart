import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Menu, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '../../constants/route';
import useAuthentication from '../../hooks/useAuthentication';
import { queryKeys } from '../../queries/query.keys';
import { Role } from '../../types/user.type';
import SignIn from '../sign-in';
import SignUp from '../sign-up';
import './styles.scss';

const quickFilter = [
  {
    key: 'logo',
    label: <img width={200} src='https://shopdunk.com/images/thumbs/0027333_logo-shopdunk.png' alt='logo' />,
    path: PRIVATE_ROUTES.DASHBOARD.ROOT
  },
  { key: 'mobile', label: 'Mobile' },
  { key: 'tablet', label: 'Tablet' },
  { key: 'mac', label: 'Mac' },
  { key: 'watch', label: 'Watch' },
  { key: 'tv', label: 'TV' }
];

const Header = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleQuickFilter = (key: string, path?: string) => () => {
    navigate(path || PRIVATE_ROUTES.MODULE.ROOT + '?category=' + key);
  };

  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(false);

  const { user, isSignedIn } = useAuthentication();

  const isAdmin = user?.role === Role.ADMIN;

  const items = [
    {
      key: 'logo',
      label: <img width={200} src='https://shopdunk.com/images/thumbs/0027333_logo-shopdunk.png' alt='logo' />,
      path: PRIVATE_ROUTES.DASHBOARD.ROOT
    },
    { key: 'mobile', label: 'Mobile' },
    { key: 'tablet', label: 'Tablet' },
    { key: 'mac', label: 'Mac' },
    { key: 'watch', label: 'Watch' },
    { key: 'tv', label: 'TV' }
  ];

  return (
    <Flex className='header' justify='center' align='center' gap={10}>
      {quickFilter.map((item) => (
        <div key={item.key} className='header-item' onClick={handleQuickFilter(item.key, item.path)}>
          {item.label}
        </div>
      ))}

      {isAdmin && (
        <div className='header-item' onClick={() => navigate(PRIVATE_ROUTES.MANAGEMENT.ROOT)}>
          <MenuOutlined />
        </div>
      )}

      {!isSignedIn && (
        <div className='header-item' onClick={() => setOpenSignUp(true)}>
          Sign Up
        </div>
      )}

      {!isSignedIn && (
        <div className='header-item' onClick={() => setOpenSignIn(true)}>
          Sign In
        </div>
      )}

      {isSignedIn && (
        <div className='header-item' onClick={() => setOpenSignOut(true)}>
          <LogoutOutlined />
        </div>
      )}

      <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
      <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />

      <Modal
        width={400}
        centered
        title={<h3>Confirm sign out</h3>}
        open={openSignOut}
        onCancel={() => setOpenSignOut(false)}
        footer={[
          <Button onClick={() => setOpenSignOut(false)}>Cancel</Button>,
          <Button
            type='primary'
            onClick={() => {
              localStorage.removeItem('user');
              queryClient.invalidateQueries({
                queryKey: queryKeys.user.invalidateDetailsKey()
              });
              setOpenSignOut(false);
            }}
          >
            Sign Out
          </Button>
        ]}
      >
        <strong>Are you sure you want to sign out?</strong>
      </Modal>
    </Flex>
  );
};

export default Header;

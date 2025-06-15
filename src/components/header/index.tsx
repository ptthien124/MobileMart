import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { MenuOutlined } from '@ant-design/icons';
import { PRIVATE_ROUTES } from '../../contants/route';

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
  { key: 'tv', label: 'TV' },
  {
    key: 'management',
    label: (
      <div>
        <MenuOutlined />
      </div>
    ),
    path: PRIVATE_ROUTES.MANAGEMENT.ROOT
  }
];

const Header = () => {
  const navigate = useNavigate();

  const handleQuickFilter = (key: string, path?: string) => () => {
    navigate(path || PRIVATE_ROUTES.MODULE.ROOT + '?category=' + key);
  };

  return (
    <Flex className='header' justify='center' align='center' gap={10}>
      {quickFilter.map((item) => (
        <div key={item.key} className='header-item' onClick={handleQuickFilter(item.key, item.path)}>
          {item.label}
        </div>
      ))}
    </Flex>
  );
};

export default Header;

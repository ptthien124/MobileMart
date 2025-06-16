import { Button } from 'antd';
import type { CardProps } from '../../../../components/card';
import Cards from '../../../../components/cards';
import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '../../../../constants/route';

type CategoryProps = {
  items: CardProps[];
  title: string;
  path: string;
};

const Category = (props: CategoryProps) => {
  const { items, title, path } = props;

  const navigate = useNavigate();

  return (
    <div className='category'>
      <h1>{title}</h1>

      <Cards items={items} />

      <Button
        size='large'
        variant='solid'
        color='blue'
        onClick={() => navigate(PRIVATE_ROUTES.MODULE.ROOT + '?category=' + path)}
      >
        View All
      </Button>
    </div>
  );
};

export default Category;

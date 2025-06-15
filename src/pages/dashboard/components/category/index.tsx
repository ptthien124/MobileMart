import type { CardProps } from '../../../../components/card';
import Cards from '../../../../components/cards';
import './styles.scss';

type CategoryProps = {
  items: CardProps[];
  title: string;
  path: string;
};

const Category = (props: CategoryProps) => {
  const { items, title } = props;

  return (
    <div className='category'>
      <h1>{title}</h1>

      <Cards items={items} />
    </div>
  );
};

export default Category;

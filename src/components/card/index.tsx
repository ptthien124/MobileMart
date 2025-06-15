import { Flex } from 'antd';
import './styles.scss';
import { PRIVATE_ROUTES } from '../../contants/route';
import { useNavigate } from 'react-router-dom';

export type CardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  discount?: number;
  status?: string;
};

/**
 * Renders a card component that displays product details such as image, name, price, discount, and status.
 * Navigates to the product module detail page on click.
 *
 * @param {CardProps} props - The properties of the card, including id, image, name, price, discount, and status.
 */
const Card = (props: CardProps) => {
  const { id, image, name, price, discount, status } = props;

  const navigate = useNavigate();

  return (
    <Flex
      className='card'
      gap={10}
      vertical
      justify='center'
      onClick={() => navigate(`${PRIVATE_ROUTES.MODULE.ROOT}/${id}`)}
    >
      <img src={image} alt={name} />

      <div>
        <h3>{name}</h3>
        <p>{price}</p>
        <p>{discount}</p>
        {status && <p>{status}</p>}
      </div>
    </Flex>
  );
};

export default Card;

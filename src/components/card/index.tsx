import { Flex, Rate, Tag } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '../../constants/route';
import { DiscountType } from '../../types/product.type';
import './styles.scss';

export type CardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  discount?: number;
  discountType?: DiscountType;
  status?: string;
};

/**
 * Renders a card component that displays product details such as image, name, price, discount, and status.
 * Navigates to the product module detail page on click.
 *
 * @param {CardProps} props - The properties of the card, including id, image, name, price, discount, and status.
 */
const Card = (props: CardProps) => {
  const { id, image, name, price, discount, discountType, status } = props;

  const navigate = useNavigate();

  const priceAfterDiscount =
    discountType === DiscountType.PERCENTAGE ? price - (price * (discount ?? 0)) / 100 : price - (discount ?? 0);

  return (
    <Flex
      className='card'
      gap={10}
      vertical
      justify='center'
      onClick={() => {
        navigate(generatePath(PRIVATE_ROUTES.MODULE.DETAIL, { id }));
      }}
    >
      <div className='image-wrapper'>
        <img src={image} alt={name} />
      </div>

      <div className='card-content'>
        <h3>{name}</h3>
        {discount && (
          <p>
            Discount: {discount} {discountType === DiscountType.PERCENTAGE ? '%' : '$'}
          </p>
        )}
        <p className='price'>
          Price: {discount && <div className='discount-price'>${price}</div>} ${priceAfterDiscount}
        </p>

        <Flex className='status' justify='space-between'>
          <Tag color={status === 'New' ? 'green' : 'red'}>{status}</Tag>
          <Rate disabled value={Math.random() * (5 - 3) + 3} />
        </Flex>
      </div>
    </Flex>
  );
};

export default Card;

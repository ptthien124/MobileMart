import { Button, Flex, Image, notification } from 'antd';
import { useParams } from 'react-router-dom';
import Cards from '../../../components/cards';
import { useGetProductById, useGetProducts, useUpdateProduct } from '../../../queries/product.query';
import './styles.scss';
import { DiscountType } from '../../../types/product.type';
import useAuthentication from '../../../hooks/useAuthentication';

const ModuleDetail = () => {
  const [api, contextHolder] = notification.useNotification();

  const { id = '' } = useParams();

  const { data: productData } = useGetProductById({ id });

  const product = productData?.data;

  const { user } = useAuthentication();

  console.log(user);

  const { data: otherProducts } = useGetProducts({
    params: { page: 1, take: 4, category: product?.category, exclude: id }
  });

  const updateProductMutation = useUpdateProduct({
    onSuccess: () => {
      api.success({ message: 'Purchase successful' });
    }
  });

  const handlePurchase = () => {
    if (product?.stock === 0) {
      api.error({ message: 'Product is out of stock' });
      return;
    }

    updateProductMutation.mutate({
      id,
      stock: (product?.stock ?? 1) - 1
    });
  };

  const priceAfterDiscount =
    product?.discountType === DiscountType.PERCENTAGE
      ? product?.price - (product?.price * (product?.discount ?? 0)) / 100
      : (product?.price ?? 0) - (product?.discount ?? 0);

  return (
    <>
      {contextHolder}
      <Flex gap={50} vertical>
        <div className='module-detail'>
          <Flex gap={30} className='module-detail-content'>
            <Image src={product?.image} alt={product?.name} />

            <Flex gap={10} vertical>
              <h1>{product?.name}</h1>
              {product?.discount && (
                <h3>
                  Discount: {product?.discount} {product?.discountType === DiscountType.PERCENTAGE ? '%' : '$'}
                </h3>
              )}

              <h3 className='price'>
                Price: {product?.discount && <div className='discount-price'>${product?.price}</div>} $
                {priceAfterDiscount}
              </h3>

              {/* <h2>
                Price:{' '}
                {product?.price
                  ? product?.discountType === DiscountType.PERCENTAGE
                    ? product?.price - product?.price * (product?.discount ?? 0)
                    : product?.price - (product?.discount ?? 0)
                  : 0}
                $
              </h2> */}

              <p>Stock: {product?.stock}</p>

              <p>{product?.description}</p>

              <Button
                disabled={!user || product?.stock === 0}
                loading={updateProductMutation.isPending}
                block
                size='large'
                className='module-purchase'
                type='primary'
                onClick={handlePurchase}
              >
                Purchase
              </Button>
            </Flex>
          </Flex>
        </div>

        <Cards
          items={
            otherProducts?.data?.data.map((item) => ({ ...item, status: item.stock > 0 ? 'New' : 'Out of stock' })) ??
            []
          }
        />
      </Flex>
    </>
  );
};

export default ModuleDetail;

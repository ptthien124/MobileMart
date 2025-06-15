import { useGetProducts } from '../../../queries/product.query';
import { CATEGORY, ProductEntity } from '../../../types/product.type';
import Category from '../components/category';
import './styles.scss';

const Dashboard = () => {
  const { data: iphoneData } = useGetProducts({
    params: {
      page: 1,
      take: 4,
      category: CATEGORY.MOBILE
    }
  });

  const { data: macData } = useGetProducts({
    params: {
      page: 1,
      take: 4,
      category: CATEGORY.MAC
    }
  });

  const products = iphoneData?.data?.data ?? [];

  const formattedProducts = products.map((product: ProductEntity) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    price: product.price,
    discount: product?.discount,
    status: product.stock > 0 ? 'New' : 'Out of stock'
  }));

  const macProducts = macData?.data?.data ?? [];

  const formattedMacProducts = macProducts.map((product: ProductEntity) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    price: product.price,
    discount: product?.discount,
    status: product.stock > 0 ? 'New' : 'Out of stock'
  }));

  return (
    <div>
      <h1>Dashboard</h1>

      <Category items={formattedProducts} title='iPhone' path='/new' />
      <Category items={formattedMacProducts} title='Mac' path='/new' />
    </div>
  );
};

export default Dashboard;

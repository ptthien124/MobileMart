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

  const { data: tabletData } = useGetProducts({
    params: {
      page: 1,
      take: 4,
      category: CATEGORY.TABLET
    }
  });

  const { data: macData } = useGetProducts({
    params: {
      page: 1,
      take: 4,
      category: CATEGORY.MAC
    }
  });

  const { data: watchData } = useGetProducts({
    params: {
      page: 1,
      take: 4,
      category: CATEGORY.WATCH
    }
  });

  const iphoneProducts = iphoneData?.data?.data ?? [];

  const formattedProducts = iphoneProducts.map((product: ProductEntity) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    price: product.price,
    discount: product?.discount,
    status: product.stock > 0 ? 'New' : 'Out of stock'
  }));

  const tabletProducts = tabletData?.data?.data ?? [];

  const formattedTabletProducts = tabletProducts.map((product: ProductEntity) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    price: product.price,
    discount: product?.discount,
    status: product.stock > 0 ? 'New' : 'Out of stock'
  }));

  const watchProducts = watchData?.data?.data ?? [];

  const formattedWatchProducts = watchProducts.map((product: ProductEntity) => ({
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

      <Category items={formattedProducts} title='Mobile' path='mobile' />
      <Category items={formattedTabletProducts} title='Tablet' path='tablet' />
      <Category items={formattedMacProducts} title='Mac' path='mac' />
      <Category items={formattedWatchProducts} title='Watch' path='watch' />
    </div>
  );
};

export default Dashboard;

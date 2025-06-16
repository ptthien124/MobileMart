import { Pagination } from 'antd';
import Cards from '../../../components/cards';
import { useGetProducts } from '../../../queries/product.query';
import { CATEGORY } from '../../../types/product.type';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_SIZE } from '../../../service/types';
import { toCapitalize } from '../../../utils';

const ModuleManagement = () => {
  const { search } = useLocation();

  const [, setSearchParams] = useSearchParams();

  const params = search
    .replace('?', '')
    .split('&')
    .reduce(
      (acc, param) => {
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

  const { data } = useGetProducts({
    params: {
      ...params,
      page: params.page ? Number(params.page) : 1,
      take: params.take ? Number(params.take) : DEFAULT_PAGE_SIZE,
      category: (params.category ? params.category : CATEGORY.MOBILE) as CATEGORY
    }
  });

  const products =
    data?.data?.data?.map((item) => ({ ...item, status: item.stock > 0 ? 'New' : 'Out of stock' })) ?? [];

  console.log(params);

  return (
    <div className='module'>
      <h1>{toCapitalize(params?.category ?? '')}</h1>

      <Cards items={products} />

      <Pagination
        className='module-pagination'
        current={params.page ? Number(params.page) : 1}
        total={data?.data?.count}
        pageSize={params.take ? Number(params.take) : DEFAULT_PAGE_SIZE}
        showSizeChanger={false}
        onChange={(page) => {
          setSearchParams({
            page: page.toString(),
            take: params.take ? params.take : DEFAULT_PAGE_SIZE.toString(),
            category: CATEGORY.MOBILE
          });
        }}
      />
    </div>
  );
};

export default ModuleManagement;

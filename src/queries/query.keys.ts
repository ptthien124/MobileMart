import type { ProductParams } from '../types/product.type';
import { UserParams } from '../types/user.type';

enum QueryKeysEnum {
  PRODUCT = 'product',
  USER = 'user'
}

export type DefaultParams = {
  q?: string;
  page?: number;
  take?: number;
  startDate?: string | Date;
  endDate?: string | Date;
  deleted?: boolean;
  tab?: string;
  filter?: string;
  roles?: string[] | number[];
  status?: string;
};

export type QueryKeyItemType<Params = unknown> = {
  scope?: QueryKeysEnum;
  entity?: string;
  id?: string;
  params?: Params;
};

export type QueryKeyTypes<Params = unknown> = [QueryKeyItemType<Params>];

const createBasicListKey = <ListParams = unknown>({ scope }: { scope: QueryKeysEnum }) => {
  const queryKeyFactory = {
    /**
     * Used to invalidate all queries related to this scope
     */
    invalidateAllKey: [{ scope }] as QueryKeyTypes,
    /**
     * Used to invalidate all list queries
     */
    invalidateListsKey: () => [{ ...queryKeyFactory.invalidateAllKey[0], entity: 'lists' }] as QueryKeyTypes,
    /**
     * List query key with params
     */
    list: (params?: ListParams) =>
      [{ ...queryKeyFactory.invalidateListsKey()[0], params }] as QueryKeyTypes<ListParams>,
    /**
     * Used to invalidate all detail queries
     */
    invalidateDetailsKey: () => [{ ...queryKeyFactory.invalidateAllKey[0], entity: 'details' }] as QueryKeyTypes,
    /**
     * Detail query key
     */
    detail: <T extends Record<string, unknown>>(id: string, params?: T) =>
      [{ ...queryKeyFactory.invalidateDetailsKey()[0], id, ...(params || {}) }] as QueryKeyTypes
  };

  return queryKeyFactory;
};

export const queryKeys = {
  product: createBasicListKey<ProductParams>({
    scope: QueryKeysEnum.PRODUCT
  }),
  user: createBasicListKey<UserParams>({
    scope: QueryKeysEnum.USER
  })
};

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseInfiniteQueryOptions,
  type UseMutationOptions,
  type UseQueryOptions
} from '@tanstack/react-query';
import type { CustomResponse, DetailResponse } from '../service/types';
import type { CreateProductEntity, ProductEntity, ProductParams, UpdateProductEntity } from '../types/product.type';
import { queryKeys, type QueryKeyTypes } from './query.keys';
import { productService } from '../service/product.service';
import { passPageParams } from '../utils';

type DefaultQuery = Partial<
  UseQueryOptions<CustomResponse<ProductEntity[]>, Error, CustomResponse<ProductEntity[]>, QueryKeyTypes<ProductParams>>
>;

type DetailQuery = Partial<UseQueryOptions<ProductEntity, Error, DetailResponse<ProductEntity>, QueryKeyTypes>>;

type InfiniteQuery = Partial<
  UseInfiniteQueryOptions<
    CustomResponse<ProductEntity[]>,
    Error,
    CustomResponse<ProductEntity[]>,
    QueryKeyTypes<ProductParams>,
    number
  >
>;

type MutationCreate = UseMutationOptions<ProductEntity, Error & { response?: unknown }, CreateProductEntity>;

type MutationUpdate = UseMutationOptions<Partial<ProductEntity>, Error & { response?: unknown }, UpdateProductEntity>;

type MutationDelete = UseMutationOptions<unknown, Error, string>;

type MutationRestore = UseMutationOptions<unknown, Error & { response?: unknown }, string>;

export const useGetProducts = (
  props: {
    params?: ProductParams;
    options?: DefaultQuery;
  } = {}
) => {
  const { params = {}, options = {} } = props;

  const query = useQuery({
    queryKey: queryKeys.product.list(passPageParams(params)),
    queryFn: productService.get,
    ...options
  });

  return query;
};

// export const useGetInfiniteProduct = (
//   props: {
//     params?: ProductParams;
//     options?: InfiniteQuery;
//   } = {}
// ) => {
//   const { params = {}, options = {} } = props;

//   const query = useInfiniteQuery({
//     queryKey: queryKeys.product.list(params),
//     queryFn: productService.getInfinite,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
//     ...options
//   });

//   return query;
// };

export const useGetProductById = (props: { id: string; options?: DetailQuery }) => {
  const { id, options } = props ?? {};

  const query = useQuery({
    queryKey: queryKeys.product.detail(id),
    queryFn: productService.getById,
    ...options
  });

  return query;
};

export const useCreateProduct = (options: MutationCreate = {}) => {
  const mutation = useMutation({
    mutationFn: productService.create,
    mutationKey: queryKeys.product.invalidateListsKey(),
    meta: { showError: false },
    // onError: (error, vars, context) => {
    //   if (error?.response?.data?.errorCode === ErrorCode.AMILI_ERROR_234) {
    //     // return errorNotification({
    //     //   error: { errorCode: ErrorCode.AMILI_ERROR_234 },
    //     //   contentObj: { productNames: error?.response?.data?.productNames }
    //     // });
    //   } else {
    //     // errorNotification({ error });
    //   }
    // },
    ...options
  });

  return mutation;
};

export const useUpdateProduct = (options: MutationUpdate = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options;

  const mutation = useMutation({
    mutationFn: productService.update,
    mutationKey: queryKeys.product.invalidateListsKey(),
    onSuccess: (data, variables, context) => {
      const { id = '' } = variables;
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: queryKeys.product.detail(id)
      });
    },
    meta: { showError: false },
    // onError: (error, vars, context) => {
    //   if (error?.response?.data?.errorCode === ErrorCode.AMILI_ERROR_234) {
    //     return errorNotification({
    //       error: { errorCode: ErrorCode.AMILI_ERROR_234 },
    //       contentObj: { productNames: error?.response?.data?.productNames }
    //     });
    //   } else {
    //     errorNotification({ error });
    //   }
    // },
    ...rest
  });

  return mutation;
};

// export const useDeleteOrder = (options: MutationDelete = {}) => {
//   const queryClient = useQueryClient();
//   const { onSuccess, ...rest } = options;

//   const mutation = useMutation({
//     mutationFn: orderService.delete,
//     mutationKey: newQueryKeys.order.invalidateListsKey(),
//     onSuccess: (data, id, context) => {
//       onSuccess && onSuccess(data, id, context);
//       queryClient.removeQueries({
//         queryKey: newQueryKeys.order.detail(id),
//         exact: true
//       });
//     },
//     ...rest
//   });

//   return mutation;
// };

// export const useRestoreOrderMutation = (options: MutationRestore = {}) => {
//   const queryClient = useQueryClient();
//   const { onSuccess, ...rest } = options;

//   const mutation = useMutation({
//     mutationFn: orderService.restoreOrder,
//     mutationKey: newQueryKeys.order.invalidateListsKey(),
//     onSuccess: (data, id, context) => {
//       onSuccess && onSuccess(data, id, context);
//       queryClient.removeQueries({
//         queryKey: newQueryKeys.order.detail(id),
//         exact: true
//       });
//     },
//     meta: { showError: false },
//     onError: (error, vars, context) => {
//       if (error?.response?.data?.errorCode === ErrorCode.AMILI_ERROR_234) {
//         return errorNotification({
//           error: { errorCode: ErrorCode.AMILI_ERROR_234 },
//           contentObj: { productNames: error?.response?.data?.productNames }
//         });
//       } else {
//         errorNotification({ error });
//       }
//     },
//     ...rest
//   });

//   return mutation;
// };

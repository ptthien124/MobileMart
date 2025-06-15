import { ZodArray, ZodObject, type ZodTypeAny } from 'zod';
import type { DefaultEntity } from '../service/types';

export const transformToSelectOptions = (data: (DefaultEntity & { name: string })[]) => {
  return data.map((item) => ({ label: item.name, value: item.id }));
};

// export const transformInfiniteQueryToSelectOptions = (
//   data: InfiniteData<CustomResponse<DefaultEntity[]>, unknown> | undefined
// ) => {
//   return data ? transformToSelectOptions(formatInfiniteQueryData(data)) : [];
// };

// export const handleScrollSelectPopupToGetNextPage = debounce(
//   ({
//     data,
//     event,
//     isFetching,
//     fetchNextPageFn
//   }: {
//     isFetching: boolean;
//     fetchNextPageFn: () => void;
//     event: UIEvent<HTMLDivElement, globalThis.UIEvent>;
//     data: InfiniteData<CustomResponse<unknown>, unknown> | undefined;
//   }) => {
//     const target = event.target as HTMLDivElement;

//     if (
//       target.scrollTop + target.offsetHeight >= target.scrollHeight - 100 &&
//       !isFetching &&
//       data?.pages?.at(-1)?.hasNextPage
//     ) {
//       fetchNextPageFn();
//     }
//   },
//   500
// );

// export const handleScrollPopupToGetNextPage =
//   (query: UseInfiniteQueryResult<InfiniteData<CustomResponse<any[]>, unknown>, Error>) =>
//   (event: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
//     handleScrollSelectPopupToGetNextPage({
//       fetchNextPageFn: query.fetchNextPage,
//       isFetching: query.isFetching,
//       data: query.data,
//       event
//     });
//   };

export const getFieldSchema = (schema: ZodTypeAny, path: string): ZodTypeAny | undefined => {
  const parts = path.split(/[.[\]]+/).filter(Boolean);
  let currentSchema = schema;
  for (const part of parts) {
    if (currentSchema instanceof ZodObject) {
      currentSchema = (currentSchema.shape as any)[part];
    } else if (currentSchema instanceof ZodArray && !isNaN(parseInt(part))) {
      currentSchema = currentSchema.element;
    } else {
      return undefined;
    }
    if (!currentSchema) return undefined;
  }
  return currentSchema;
};

export const isFieldRequired = (schema: ZodTypeAny, fieldName: string): boolean => {
  const fieldSchema = getFieldSchema(schema, fieldName);
  if (!fieldSchema) {
    return false;
  }
  return !fieldSchema.isOptional() && !fieldSchema.isNullable();
};

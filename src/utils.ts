import { DefaultParams } from './queries/query.keys';

export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const passPageParams = (params: DefaultParams) => {
  return {
    ...params,
    page: params.page ?? 1,
    take: params.take ?? 10
  };
};

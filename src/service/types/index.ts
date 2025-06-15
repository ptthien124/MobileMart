export type DefaultEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type DefaultResponse = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
};

export type DetailResponse<T> = DefaultResponse & {
  data: T;
};

export type CustomResponse<T> = DefaultResponse & {
  data: { data: T; count: number };
};

export const DEFAULT_PAGE_SIZE = 10;

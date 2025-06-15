import type { DefaultEntity } from '../service/types';

export type ProductEntity = DefaultEntity & {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: CATEGORY;
  image: string;
  discount?: number;
  discountType?: DiscountType;
};

export type ProductParams = {
  q?: string;
  page?: number;
  take?: number;
  category?: CATEGORY;
  exclude?: string;
};

export type CreateProductEntity = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: CATEGORY;
  image: string;
};

export type UpdateProductEntity = {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: CATEGORY;
  image?: string;
};

export enum CATEGORY {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  MAC = 'mac',
  WATCH = 'watch',
  TV = 'tv'
}

export enum DiscountType {
  PERCENTAGE = 'percentage',
  AMOUNT = 'amount'
}

export type CreateProduct = {
  name: string;
  price: number;
  discount?: number;
  discountType?: DiscountType;
  description: string;
  stock: number;
  image: string;
  category: CATEGORY;
  brand: string;
};

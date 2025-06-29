import type { CreateProduct, ProductEntity } from '../types/product.type';
import APIService from './axios.service';
import { BaseService } from './base.service';

class ProductServiceClass extends BaseService<'product', ProductEntity, CreateProduct> {
  constructor() {
    super('product');
  }
}

export const productService = new ProductServiceClass();

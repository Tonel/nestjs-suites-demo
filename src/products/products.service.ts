import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  // the in-memory database where to store data
  private products: Product[] = [];

  create(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      // generate a random UUID for the new product
      id: crypto.randomUUID(),
      ...product,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  update(
    id: string,
    updateProduct: Partial<Omit<Product, 'id'>>,
  ): Product | undefined {
    const product = this.findById(id);

    if (product) {
      Object.assign(product, updateProduct);
      return product;
    }

    return undefined;
  }

  delete(id: string): boolean {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }

    return false;
  }
}

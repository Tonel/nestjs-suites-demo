import { InMemoryDBEntity } from '@trustswap/nestjs-in-memory-db';

export interface ProductEntity extends InMemoryDBEntity {
  name: string;
  description: string;
  price: number;
}

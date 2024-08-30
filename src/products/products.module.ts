import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@trustswap/nestjs-in-memory-db';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [InMemoryDBModule.forFeature('products')],
})
export class ProductsModule {}

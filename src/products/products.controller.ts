import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProductDto: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    const product = this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<Omit<Product, 'id'>>,
  ): Promise<Product> {
    const updatedProduct = this.productService.update(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const deleted = this.productService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}

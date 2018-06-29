import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  async create(@Body() request: any) {
    return {
      message: 'Product created!',
    };
  }
}
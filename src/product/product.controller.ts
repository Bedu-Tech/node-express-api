import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateRequest } from './dto/create-request.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  async create(@Body() request: CreateRequest) {
    return await this.productService.create(request);
  }
}
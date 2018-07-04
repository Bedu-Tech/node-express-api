import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateRequest } from './dto/create-request.dto';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  async findAll (): Promise<Product[]> {
    return await this.productService.findAll()
  }

  @Post()
  async create(@Body() request: CreateRequest) {
    return await this.productService.create(request);
  }
}
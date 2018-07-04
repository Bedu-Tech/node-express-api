import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateRequest } from './dto/create-request.dto';
import { Product } from './interfaces/product.interface';
import { Types } from 'mongoose';
import { UpdateRequest } from './dto/update-request.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  async findAll (): Promise<Product[]> {
    return await this.productService.findAll()
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('NOT_VALID_OBJECT_ID', HttpStatus.BAD_REQUEST)
    }
    return await this.productService.find(id)
  }

  @Post()
  async create(@Body() request: CreateRequest) {
    return await this.productService.create(request);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateRequest) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('NOT_VALID_OBJECT_ID', HttpStatus.BAD_REQUEST)
    }
    return await this.productService.update(id, request)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(id)
    return
  }
}
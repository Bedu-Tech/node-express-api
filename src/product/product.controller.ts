import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateRequest } from './dto/create-request.dto';
import { Product } from './interfaces/product.interface';
import { Types } from 'mongoose';
import { UpdateRequest } from './dto/update-request.dto';
import { AuthGuard } from '../../node_modules/@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('NOT_VALID_OBJECT_ID', HttpStatus.BAD_REQUEST);
    }
    return await this.productService.find(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() request: CreateRequest) {
    return await this.productService.create(request);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() request: UpdateRequest) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('NOT_VALID_OBJECT_ID', HttpStatus.BAD_REQUEST);
    }
    return await this.productService.update(id, request);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
    return;
  }
}
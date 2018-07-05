import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateRequest } from './dto/create-request.dto';
import { UpdateRequest } from './dto/update-request.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateRequest): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async find(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateRequest): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, {
      ...updateProductDto,
    }, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
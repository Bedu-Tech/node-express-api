import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

// MongoUrl from environment (file .env)
const MONGO_URL = process.env.MONGO_URL || '';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    ProductModule,
  ],
})
export class ApplicationModule {}
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ProductController } from './product.controller';
import { IProductService } from './product.interface';
import { ProductService } from './product.service';

export const productProvider = {
  provide: IProductService,
  useClass: ProductService,
};

@Module({
  providers: [productProvider],
  controllers: [ProductController],
  imports: [PrismaModule],
})
export class ProductModule {}

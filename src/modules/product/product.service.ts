import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IProductService } from './product.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: any, authorId: number): Promise<Product> {
    return this.prisma.product.create({
      data: { ...dto, userId: authorId },
      include: { author: true },
    });
  }
  getOne(): void {
    throw new Error('Method not implemented.');
  }
  getOneByName(): void {
    throw new Error('Method not implemented.');
  }
  getMany(): void {
    throw new Error('Method not implemented.');
  }
  update(): void {
    throw new Error('Method not implemented.');
  }
  delete(): void {
    throw new Error('Method not implemented.');
  }
}

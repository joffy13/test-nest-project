import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IProductService } from './product.interface';
import { productSelect } from './product.select';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: any, authorId: number): Promise<any> {
    return this.prisma.product.create({
      data: { ...dto, authorId },
      include: { author: { select: { email: true, role: true } }, game: true },
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

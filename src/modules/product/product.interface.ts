import { Product } from '@prisma/client';

export interface IProductService {
  create(dto: any, authorId: number): Promise<Product>;
  getOne(): void;
  getOneByName(): void;
  getMany(): void;
  update(): void;
  delete(): void;
}
export const IProductService = Symbol('IProductService');

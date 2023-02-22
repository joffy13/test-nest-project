import { Game } from '@prisma/client';

export interface IGameService {
  create(dto: any): Promise<Game>;
  getOne(): void;
  getOneByName(): void;
  getMany(): void;
  update(): void;
  delete(): void;
}
export const IGameService = Symbol('IGameService');

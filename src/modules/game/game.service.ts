import { Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IGameService } from './game.interface';

@Injectable()
export class GameService implements IGameService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: any): Promise<Game> {
    return this.prisma.game.create({ data: dto });
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

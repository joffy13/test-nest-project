import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { GameController } from './game.controller';
import { IGameService } from './game.interface';
import { GameService } from './game.service';

export const gameProvider = {
  provide: IGameService,
  useClass: GameService,
};

@Module({
  providers: [gameProvider],
  controllers: [GameController],
  imports: [PrismaModule],
})
export class GameModule {}

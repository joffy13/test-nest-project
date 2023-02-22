import { Body, Controller, Post, Inject } from '@nestjs/common';
import { IGameService } from './game.interface';

@Controller('game')
export class GameController {
  constructor(
    @Inject(IGameService) private readonly gameService: IGameService,
  ) {}

  @Post()
  create(@Body() dto) {
    return this.gameService.create(dto);
  }
}

import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IProductService } from './product.interface';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(IProductService) private readonly productService: IProductService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: any) {
    console.log(req.user);
    return this.productService.create(req.body, req.user.id);
  }
}

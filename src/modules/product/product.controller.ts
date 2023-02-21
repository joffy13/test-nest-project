import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
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
  async create(@Body() dto: any, @Request() req) {
    console.log(req.user);
    return this.productService.create(dto, req.user.id);
  }
}

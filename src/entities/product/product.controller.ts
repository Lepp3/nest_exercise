import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('product')
export class ProductController extends BaseController<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(protected readonly productService: ProductService) {
    super(productService);
  }
  @Post()
  @ApiBody({ type: CreateProductDto })
  override create(@Body() dto: CreateProductDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProductDto })
  override update(@Param() id: string, @Body() dto: UpdateProductDto) {
    return super.update(id, dto);
  }
}

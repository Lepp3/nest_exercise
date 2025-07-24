import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.service';

@Controller('product')
export class ProductController extends BaseController<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(protected readonly productService: ProductService) {
    super(productService);
  }
}

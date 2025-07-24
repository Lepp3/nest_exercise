import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateProductSchema, UpdateProductSchema } from './product.schema';

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    super(repo, 'Product');
  }

  async create(dto: CreateProductInput) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateProductInput) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

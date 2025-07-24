import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateInvoiceSchema, UpdateInvoiceSchema } from './invoice.schema';

export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof UpdateInvoiceSchema>;

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
  constructor(@InjectRepository(Invoice) repo: Repository<Invoice>) {
    super(repo, 'Invoice');
  }

  async create(dto: CreateInvoiceInput) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateInvoiceInput) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

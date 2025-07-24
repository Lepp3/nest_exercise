import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateInvoiceSchema, UpdateInvoiceSchema } from './invoice.schema';

export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoiceDto = z.infer<typeof UpdateInvoiceSchema>;

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
  constructor(@InjectRepository(Invoice) repo: Repository<Invoice>) {
    super(repo, 'Invoice');
  }

  async create(dto: CreateInvoiceDto) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateInvoiceDto) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

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
    super(repo);
  }
}

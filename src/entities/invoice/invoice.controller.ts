import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.service';

@Controller('invoice')
export class InvoiceController extends BaseController<
  Invoice,
  CreateInvoiceDto,
  UpdateInvoiceDto
> {
  constructor(protected readonly invoiceService: InvoiceService) {
    super(invoiceService);
  }
}

import { Controller, Post, Put, Param, Body } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('invoice')
export class InvoiceController extends BaseController<
  Invoice,
  CreateInvoiceDto,
  UpdateInvoiceDto
> {
  constructor(protected readonly invoiceService: InvoiceService) {
    super(invoiceService);
  }

  @Post()
  @ApiBody({ type: CreateInvoiceDto })
  override create(@Body() dto: CreateInvoiceDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateInvoiceDto })
  override update(@Param() id: string, @Body() dto: UpdateInvoiceDto) {
    return super.update(id, dto);
  }
}

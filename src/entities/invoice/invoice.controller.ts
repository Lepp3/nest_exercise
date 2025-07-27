import { Controller, Post, Put, Param, Body } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CurrentUser, AuthUser } from 'src/decorators/currentUser.decorator';
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
  @ApiBody({
    type: CreateInvoiceDto,
    examples: {
      default: {
        value: {
          orderId: '',
          date: '',
          invoiceNumber: '',
        },
      },
    },
  })
  override create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateInvoiceDto,
  ) {
    return super.create(user, dto);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateInvoiceDto,
    examples: {
      default: {
        value: {
          orderId: '',
          date: '',
          invoiceNumber: '',
        },
      },
    },
  })
  override update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateInvoiceDto,
  ) {
    return super.update(user, id, dto);
  }
}

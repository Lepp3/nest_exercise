import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('partner')
export class PartnerController extends BaseController<
  Partner,
  CreatePartnerDto,
  UpdatePartnerDto
> {
  constructor(protected readonly partnerService: PartnerService) {
    super(partnerService);
  }

  @Get('loyal-customer')
  getMostLoyalCustomer() {
    return this.partnerService.getMostLoyalCustomer();
  }
  @Post()
  @ApiBody({ type: CreatePartnerDto })
  override create(@Body() dto: CreatePartnerDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({
    type: UpdatePartnerDto,
    examples: {
      default: {
        value: {
          name: '',
          partnerType: '',
          companyId: '',
        },
      },
    },
  })
  override update(@Param() id: string, @Body() dto: UpdatePartnerDto) {
    return super.update(id, dto);
  }
}

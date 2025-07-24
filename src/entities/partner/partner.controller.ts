import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.service';

@Controller('partner')
export class PartnerController extends BaseController<
  Partner,
  CreatePartnerDto,
  UpdatePartnerDto
> {
  constructor(protected readonly partnerService: PartnerService) {
    super(partnerService);
  }
}

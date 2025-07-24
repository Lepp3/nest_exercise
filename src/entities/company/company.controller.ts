import { Controller } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { type CreateCompanyDto, UpdateCompanyDto } from './company.service';
import { BaseController } from 'src/common/base.controller';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('company')
export class CompanyController extends BaseController<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(protected readonly companyService: CompanyService) {
    super(companyService);
  }
}

import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './company.schema';
import { BaseController } from 'src/common/base.controller';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

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

  @Post()
  @ApiBody({ type: CreateCompanyDto })
  override create(@Body() dto: CreateCompanyDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateCompanyDto })
  override update(@Param() id: string, @Body() dto: UpdateCompanyDto) {
    return super.update(id, dto);
  }
}

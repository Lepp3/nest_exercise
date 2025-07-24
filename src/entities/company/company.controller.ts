import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { type CreateCompanyDto, UpdateCompanyDto } from './company.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../user/user.entity';
import { DeleteResult } from 'typeorm';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companyService.getAll();
  }

  @Post()
  create(@Body() dto: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companyService.getById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.update(id, dto);
  }

  @Delete(':id/hard')
  @Roles(UserRole.OWNER)
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.companyService.delete(id);
  }

  @Delete(':id/soft')
  @Roles(UserRole.OPERATOR, UserRole.OWNER)
  softDelete(@Param('id') id: string): Promise<DeleteResult> {
    return this.companyService.softDelete(id);
  }
}

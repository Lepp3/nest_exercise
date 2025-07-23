import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { type CreateCompanyDto, UpdateCompanyDto } from './company.service';
import { JwtAuthGuard } from 'src/guards/authGuard';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Post()
  create(@Body() dto: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.companyService.delete(id);
  }
}

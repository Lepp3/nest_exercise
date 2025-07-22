import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { z } from 'zod';
import { CreateCompanySchema, UpdateCompanySchema } from './company.schema';

export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>;
export type UpdateCompanyDto = z.infer<typeof UpdateCompanySchema>;

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}
  async findAll(): Promise<Company[]> {
    return this.companyRepo.find();
  }

  async create(dto: CreateCompanyDto): Promise<Company> {
    const existing = await this.companyRepo.findOne({
      where: { name: dto.name },
    });
    if (existing)
      throw new ConflictException(
        `Company with name '${dto.name}' already exists`,
      );
    const company = this.companyRepo.create(dto);
    return this.companyRepo.save(company);
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) throw new NotFoundException(`Company ${id} not found`);
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    if (!company) throw new NotFoundException(`Company ${id} not found`);
    if (dto.name !== company.name) {
      const existing = await this.companyRepo.findOne({
        where: { name: dto.name },
      });
      if (existing)
        throw new ConflictException(
          `Company with name '${dto.name}' already exists`,
        );
    }
    Object.assign(company, dto);
    return this.companyRepo.save(company);
  }

  async delete(id: string): Promise<void> {
    const company = await this.findOne(id);
    await this.companyRepo.softRemove(company);
  }
}

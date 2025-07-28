import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { z } from 'zod';
import { CreateCompanySchema, UpdateCompanySchema } from './company.schema';
import { BaseService } from 'src/common/base.service';

export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof UpdateCompanySchema>;

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(@InjectRepository(Company) repo: Repository<Company>) {
    super(repo);
  }

  async getByName(name: string): Promise<Company | null> {
    const company = await this.repo.findOne({
      where: {
        name,
      },
    });
    if (!company) {
      return null;
    }

    return company;
  }

  async create(dto: CreateCompanyInput): Promise<Company> {
    const existing = await this.getByName(dto.name);
    if (existing)
      throw new ConflictException(
        `Company with name '${dto.name}' already exists`,
      );

    return super.create(dto);
  }

  async update(id: string, dto: UpdateCompanyInput): Promise<Company> {
    const company = await this.getById(id);
    if (dto.name !== company.name) {
      const existing = await this.repo.findOne({
        where: { name: dto.name },
      });
      if (existing)
        throw new ConflictException(
          `Company with name '${dto.name}' already exists`,
        );
    }

    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

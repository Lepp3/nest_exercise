import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './partner.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreatePartnerSchema, UpdatePartnerSchema } from './partner.schema';

export type CreatePartnerDto = z.infer<typeof CreatePartnerSchema>;
export type UpdatePartnerDto = z.infer<typeof UpdatePartnerSchema>;

@Injectable()
export class PartnerService extends BaseService<Partner> {
  constructor(@InjectRepository(Partner) repo: Repository<Partner>) {
    super(repo, 'Partner');
  }

  async create(dto: CreatePartnerDto) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdatePartnerDto) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

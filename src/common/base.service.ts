import { NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';

export abstract class BaseService<T extends BaseEntity> {
  constructor(
    protected readonly repo: Repository<T>,
    protected readonly entityName: string,
  ) {}
  async getAll(companyId?: string): Promise<T[]> {
    const items = await this.repo.find({
      where: {
        companyId,
        ...(companyId ? { companyId } : {}),
      } as FindOptionsWhere<T>,
    });

    if (!items) {
      throw new NotFoundException(`Items not found!`);
    }
    //empty arr instead of error i gaz
    return items;
  }

  async getById(id: string, companyId?: string): Promise<T> {
    const item = await this.repo.findOne({
      where: { id, ...(companyId ? { companyId } : {}) } as FindOptionsWhere<T>,
    });
    if (!item) throw new NotFoundException(`${this.entityName} not found`);
    return item;
  }

  async create(
    data: DeepPartial<T>,
    companyId?: string,
    userId?: string,
  ): Promise<T> {
    const entity = this.repo.create({
      ...data,
      companyId,
      userId,
      modifiedBy: userId,
    });
    return this.repo.save(entity);
  }

  async update(id: string, data: Partial<T>, companyId?: string): Promise<T> {
    const item = await this.getById(id, companyId);
    if (!item) throw new NotFoundException(`${this.entityName} not found`);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async softDelete(id: string, companyId?: string) {
    await this.getById(id, companyId);
    return this.repo.softDelete(id);
  }

  async delete(id: string, companyId?: string) {
    await this.getById(id, companyId);
    return this.repo.delete(id);
  }
}

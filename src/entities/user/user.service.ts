import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateUserSchema, UpdateUserSchema } from './update-user.schema';

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo, 'User');
  }

  async getByUsername(username: string, withPassword = false) {
    return this.repo.findOne({
      where: { username },
      select: withPassword
        ? ['id', 'username', 'password']
        : ['id', 'username'],
    });
  }

  async create(dto: CreateUserInput) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateUserInput) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

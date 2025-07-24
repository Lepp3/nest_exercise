import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateUserSchema, UpdateUserSchema } from './update-user.schema';

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

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

  async create(dto: CreateUserDto) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateUserDto) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

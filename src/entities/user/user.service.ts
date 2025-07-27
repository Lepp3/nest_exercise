import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import {
  CreateUserSchema,
  UpdateUserSchema,
  CreateUserDto,
  ClientUserDto,
} from './update-user.schema';

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
      select: {
        id: true,
        username: true,
        password: withPassword,
        role: true,
        companyId: true,
      },
    });
  }

  async createNewOwner(dto: CreateUserInput) {
    const newUser = await this.repo.save(dto);
    return newUser;
  }

  async addUserToCompany(
    dto: ClientUserDto,
    companyId: string,
    userId: string,
  ) {
    return super.create(dto, companyId, userId);
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

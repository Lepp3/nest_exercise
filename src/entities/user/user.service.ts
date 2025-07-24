import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseService } from 'src/common/base.service';

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

  async create(data: Partial<User>) {
    return super.create(data);
  }

  async update(id: string, data: Partial<User>) {
    return super.update(id, data);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

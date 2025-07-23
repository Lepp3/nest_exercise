import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getAll() {
    return this.userRepo.find();
  }

  async getById(userId: string) {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async getByUsername(username: string, withPassword = false) {
    return this.userRepo.findOne({
      where: { username },
      select: withPassword
        ? ['id', 'username', 'password']
        : ['id', 'username'],
    });
  }

  async create(data: Partial<User>) {
    const user = await this.userRepo.save(data);
    return user;
  }

  async update(id: string, data: Partial<User>, reqUser: { role: UserRole }) {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (reqUser.role === UserRole.VIEWER) {
      throw new ForbiddenException('Viewer role cannot update users');
    }
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async softDelete(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.softDelete(id);
  }

  async delete(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.delete(id);
  }
}

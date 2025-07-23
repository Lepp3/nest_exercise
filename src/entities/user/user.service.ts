import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

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
    console.log('data from user service', data);
    const user = await this.userRepo.save(data);
    return user;
  }

  // async update({ id, data }: { id: string; data: Partial<User> }) {
  //   const user = await this.getById(id);
  //   if (!user) {
  //     throw new Error('User with this id does not exist');
  //   }
  //   return this.userRepo.update(data);
  // }
}

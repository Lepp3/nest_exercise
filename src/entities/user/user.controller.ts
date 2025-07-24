import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.service';
import { JwtAuthGuard } from 'src/guards/authGuard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }
}

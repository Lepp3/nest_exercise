import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './update-user.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('user')
export class UserController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }
  @Post()
  @ApiBody({ type: CreateUserDto })
  override create(@Body() dto: CreateUserDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  override update(@Param() id: string, @Body() dto: UpdateUserDto) {
    return super.update(id, dto);
  }
}

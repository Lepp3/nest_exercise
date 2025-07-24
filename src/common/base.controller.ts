import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Controller,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/entities/user/user.entity';
import { DeleteResult, DeepPartial } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';

@Controller()
export abstract class BaseController<
  T extends BaseEntity,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends Partial<T>,
> {
  constructor(protected readonly service: BaseService<T>) {}

  @Get()
  getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<T> {
    return this.service.getById(id);
  }

  @Post()
  @Roles(UserRole.OPERATOR, UserRole.OWNER)
  create(@Body() dto: CreateDto): Promise<T> {
    return this.service.create(dto);
  }

  @Put(':id')
  @Roles(UserRole.OPERATOR, UserRole.OWNER)
  update(@Param('id') id: string, @Body() dto: UpdateDto): Promise<T> {
    return this.service.update(id, dto);
  }

  @Delete(':id/hard')
  @Roles(UserRole.OWNER)
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }

  @Delete(':id/soft')
  @Roles(UserRole.OWNER, UserRole.OPERATOR)
  softDelete(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.softDelete(id);
  }
}

import {
  Controller,
  Get,
  //   Req,
  //   Put,
  //   Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/authGuard';
import { Request } from 'express';
// import { UpdateUserInput, UpdateUserSchema } from './update-user.schema';
// import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  //   @Put(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body(new ZodValidationPipe(UpdateUserSchema)) data: UpdateUserInput,
  //     @Req() req: Request,
  //   ) {
  //     return this.userService.update(id, data, req.user);
  //   }

  //   @Delete(':id')
  //   delete(@Param('id') id: string, @Req() req: Request) {
  //     return this.userService.delete(id, req.user);
  //   }
}

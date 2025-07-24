import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, LoginSchema } from './login.schema';

import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { Public } from 'src/decorators/public.decorator';
import {
  CreateUserSchema,
  RegisterUserInput,
  CreateUserDto,
} from 'src/entities/user/update-user.schema';
import { LoginDto } from './login.schema';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  register(
    @Body(new ZodValidationPipe(CreateUserSchema)) body: RegisterUserInput,
  ) {
    return this.authService.register(body);
  }
  @Public()
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Body(new ZodValidationPipe(LoginSchema)) body: LoginInput) {
    return this.authService.login(body);
  }
}

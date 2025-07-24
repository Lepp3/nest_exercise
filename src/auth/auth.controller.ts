import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, LoginSchema } from './login.schema';

import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { Public } from 'src/decorators/public.decorator';
import {
  CreateUserSchema,
  RegisterUserInput,
} from 'src/entities/user/update-user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(
    @Body(new ZodValidationPipe(CreateUserSchema)) body: RegisterUserInput,
  ) {
    return this.authService.register(body);
  }
  @Public()
  @Post('login')
  login(@Body(new ZodValidationPipe(LoginSchema)) body: LoginInput) {
    return this.authService.login(body);
  }
}

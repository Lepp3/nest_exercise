import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/entities/user/user.service';
import { LoginInput } from './login.schema';
import { RegisterInput } from './register.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userService.create({
      name: data.name,
      username: data.username,
      password: hashedPassword,
      role: data.role,
      companyId: data.company_id,
    });
    return this.signToken(user.id, user.username, user.role);
  }

  async login(data: LoginInput) {
    const user = await this.userService.getByUsername(data.username, true);
    const valid = user && (await bcrypt.compare(data.password, user.password));

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user.id, user.username, user.role);
  }

  private async signToken(userId: string, username: string, role: string) {
    const payload = { sub: userId, username, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

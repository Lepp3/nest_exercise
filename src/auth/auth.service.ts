import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/entities/user/user.service';
import { LoginInput } from './login.schema';
import { RegisterWithCompanyInput } from './register.schema';
import { CompanyService } from 'src/entities/company/company.service';
import { UserRole } from 'src/entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterWithCompanyInput) {
    const existingCompany = await this.companyService.getByName(data.name);
    if (existingCompany) {
      return new ConflictException('Company with this name already exists!');
    }
    const company = await this.companyService.create({
      name: data.companyName,
      location: data.companyLocation,
    });
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userService.createNewOwner({
      name: data.name,
      username: data.username,
      password: hashedPassword,
      role: UserRole.OWNER,
      companyId: company.id,
    });
    return this.signToken(user.id, user.username, user.role, user.companyId);
  }

  async login(data: LoginInput) {
    const user = await this.userService.getByUsername(data.username, true);
    const valid = user && (await bcrypt.compare(data.password, user.password));

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user.id, user.username, user.role, user.companyId);
  }

  private async signToken(
    userId: string,
    username: string,
    role: string,
    companyId: string,
  ) {
    const payload = { sub: userId, username, role, companyId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

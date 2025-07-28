import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Get,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './company.schema';
import { BaseController } from 'src/common/base.controller';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint } from '@nestjs/swagger';
import { CurrentUser, AuthUser } from 'src/decorators/currentUser.decorator';

@ApiBearerAuth('Authorization')
@Controller('company')
export class CompanyController extends BaseController<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(protected readonly companyService: CompanyService) {
    super(companyService);
  }

  @Get()
  @ApiExcludeEndpoint()
  @HttpCode(403)
  override getAll(): Promise<Company[]> {
    throw new ForbiddenException('Access to company list is restricted');
  }

  // @Get(':id')
  // @ApiExcludeEndpoint()
  // @HttpCode(403)
  // override getById(@Param('id') _id: string): Promise<Company> {
  //   throw new ForbiddenException('Access to company details is restricted');
  // }

  @Post()
  @ApiExcludeEndpoint()
  @HttpCode(403)
  @ApiBody({
    type: CreateCompanyDto,
    examples: {
      default: {
        value: {
          name: '',
          location: '',
        },
      },
    },
  })
  override create(
    @CurrentUser() _user: AuthUser,
    @Body() _dto: CreateCompanyDto,
  ): Promise<Company> {
    throw new ForbiddenException(
      'Company creation is only allowed via registration',
    );
  }

  @Put(':id')
  @ApiBody({
    type: UpdateCompanyDto,
    examples: {
      default: {
        value: {
          name: '',
          location: '',
        },
      },
    },
  })
  override update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return super.update(user, id, dto);
  }
}

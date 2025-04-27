import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { BaseResponse } from 'src/common/base.response';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticatedRequest } from './types/authenticated-request';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<BaseResponse> {
    const user = await this.userService.create(
      dto.email,
      dto.password,
      dto.nickname,
    );
    return new BaseResponse(true, '회원가입 완료', user);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<BaseResponse> {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const response = await this.authService.login(user.id);
    return new BaseResponse(true, '로그인 성공', response);
  }

  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @Post('refresh')
  async refreshToken(@Req() req: AuthenticatedRequest): Promise<BaseResponse> {
    const response = await this.authService.refreshToken(req.user.id);
    return new BaseResponse(true, '토큰 발급 완료', response);
  }
}

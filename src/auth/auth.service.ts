import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('잘못된 로그인 정보입니다');
  }

  async login(
    userId: string,
  ): Promise<{ id: string; token: string; refreshToken: string }> {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    return {
      id: userId,
      token: accessToken,
      refreshToken,
    };
  }

  async generateTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, this.refreshTokenConfig),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshToken(userId: string): Promise<{ id: string; token: string }> {
    const payload = { sub: userId };
    const token = await this.jwtService.sign(payload);
    return {
      id: userId,
      token,
    };
  }
}

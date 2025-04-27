import { UserService } from './user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { BaseResponse } from 'src/common/base.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Req() req): Promise<BaseResponse> {
    const user = await this.userService.findById(req.user.id);
    // const userProfile;
    return new BaseResponse(true, '프로필 조회 성공', user);
  }
}

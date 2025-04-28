import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DrawService } from './draw.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base.response';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async draw(@Req() req: AuthenticatedRequest): Promise<BaseResponse> {
    const userId = req.user.id;
    const todayDraw = await this.drawService.findTodayDraw(userId);

    if (todayDraw) {
      return new BaseResponse(true, '이미 오늘 운세를 뽑았습니다.', todayDraw);
    }

    const newDraw = await this.drawService.createDraw(userId);
    return new BaseResponse(true, '운세 뽑기 성공', newDraw);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('today')
  async findTodayDraw(@Req() req: AuthenticatedRequest): Promise<BaseResponse> {
    const todayDraw = await this.drawService.findTodayDraw(req.user.id);

    if (!todayDraw) {
      throw new NotFoundException('오늘 뽑은 운세가 없습니다.');
    }

    return new BaseResponse(true, '오늘의 운세 조회 성공', todayDraw);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('history')
  async getHistory(@Req() req: AuthenticatedRequest): Promise<BaseResponse> {
    const history = await this.drawService.findAllDrawsByUser(req.user.id);
    return new BaseResponse(true, '운세 기록 조회 성공', history);
  }
}
